#!/usr/bin/env bash
set -euo pipefail

# ------------------------------------------------------------------
# BlackBeetle Frontend — Build & Deploy
#
# Builds the Nuxt app locally (requires Node 22+) and uploads the
# self-contained .output/ directory to the server via SFTP (default)
# or FTP (fallback with --ftp). Both use lftp mirror.
#
# SFTP is significantly faster than FTP:
#   • Single encrypted connection (no per-file overhead)
#   • Binary protocol with less round-trips
#   • Parallel transfers via lftp
#
# Usage:
#   ./deploy.sh              # build + deploy via SFTP
#   ./deploy.sh --dry-run    # build + preview upload (no transfer)
#   ./deploy.sh --sync-only  # skip build, upload existing .output/
#   ./deploy.sh --ftp        # use FTP instead of SFTP
# ------------------------------------------------------------------

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ── Check dependencies ────────────────────────────────────────────
if ! command -v lftp &>/dev/null; then
  echo "ERROR: lftp is not installed. Enter the dev shell (direnv) or run: nix develop"
  exit 1
fi

# ── Load deploy config ────────────────────────────────────────────
DEPLOY_ENV_FILE=".deploy.env"

if [[ ! -f "$DEPLOY_ENV_FILE" ]]; then
  echo "ERROR: $DEPLOY_ENV_FILE not found."
  echo "Copy .deploy.env.example to .deploy.env and fill in the values."
  exit 1
fi

# shellcheck source=/dev/null
source "$DEPLOY_ENV_FILE"

: "${DEPLOY_FTP_HOST:?DEPLOY_FTP_HOST is not set in $DEPLOY_ENV_FILE}"
: "${DEPLOY_FTP_USER:?DEPLOY_FTP_USER is not set in $DEPLOY_ENV_FILE}"
: "${DEPLOY_FTP_PASS:?DEPLOY_FTP_PASS is not set in $DEPLOY_ENV_FILE}"
: "${DEPLOY_PATH:?DEPLOY_PATH is not set in $DEPLOY_ENV_FILE}"

# SSH/SFTP config (falls back to FTP values if not set)
DEPLOY_SSH_HOST="${DEPLOY_SSH_HOST:-$DEPLOY_FTP_HOST}"
DEPLOY_SSH_USER="${DEPLOY_SSH_USER:-$DEPLOY_FTP_USER}"
DEPLOY_SSH_PASS="${DEPLOY_SSH_PASS:-$DEPLOY_FTP_PASS}"
DEPLOY_SSH_PORT="${DEPLOY_SSH_PORT:-22}"

# ── Parse flags ───────────────────────────────────────────────────
DRY_RUN=false
SYNC_ONLY=false
USE_FTP=false

for arg in "$@"; do
  case "$arg" in
    --dry-run)   DRY_RUN=true ;;
    --sync-only) SYNC_ONLY=true ;;
    --ftp)       USE_FTP=true ;;
    *)           echo "Unknown option: $arg"; exit 1 ;;
  esac
done

# ── Build ─────────────────────────────────────────────────────────
if [[ "$SYNC_ONLY" == false ]]; then
  echo "── Building with production env vars ──"

  if [[ ! -f ".env.prod" ]]; then
    echo "ERROR: .env.prod not found. Create it with production NUXT_PUBLIC_* values."
    exit 1
  fi

  # Export production env vars for the build
  # Note: NUXT_PUBLIC_* vars are overridden at runtime by server env vars,
  # but exporting them here ensures the build defaults are sensible.
  set -a
  # shellcheck source=/dev/null
  source .env.prod
  set +a

  npm run build

  echo ""
  echo "Build complete: .output/server/index.mjs"
fi

# ── Verify build output exists ────────────────────────────────────
if [[ ! -f ".output/server/index.mjs" ]]; then
  echo "ERROR: .output/server/index.mjs not found. Run a build first."
  exit 1
fi

# ── Resolve symlinks (SFTP/FTP can't transfer them) ───────────────
echo "── Resolving symlinks in .output/ ──"
MAX_PASSES=5
for (( pass=1; pass<=MAX_PASSES; pass++ )); do
  mapfile -t links < <(find .output -type l)
  [[ ${#links[@]} -eq 0 ]] && break
  echo "  pass $pass: ${#links[@]} symlink(s) remaining"
  for link in "${links[@]}"; do
    target=$(readlink -f "$link")
    if [[ -e "$target" ]]; then
      rm "$link"
      cp -r "$target" "$link"
      echo "  resolved: $link"
    else
      # Try resolving via .nitro hoisted store (pnpm-style)
      raw=$(readlink "$link")
      pkg_pattern=$(echo "$raw" | grep -oP '[^/]+$')
      nitro_dir=".output/server/node_modules/.nitro"
      match=$(find "$nitro_dir" -maxdepth 1 -type d -name "${pkg_pattern}@*" 2>/dev/null | head -1)
      if [[ -n "$match" ]]; then
        rm "$link"
        cp -r "$match" "$link"
        echo "  resolved (via .nitro): $link"
      else
        echo "  WARNING: broken symlink: $link -> $raw"
      fi
    fi
  done
done

# ── Upload ────────────────────────────────────────────────────────
LFTP_OPTS="mirror --reverse --verbose --delete --parallel=2"

if [[ "$DRY_RUN" == true ]]; then
  LFTP_OPTS="$LFTP_OPTS --dry-run"
fi

# Strip credentials from lftp verbose output
sanitize_output() {
  sed -E 's|://[^@]+@|://***@|g'
}

if [[ "$USE_FTP" == true ]]; then
  # ── FTP fallback ────────────────────────────────────────────────
  if [[ "$DRY_RUN" == true ]]; then
    echo "── Dry run (FTP) — no files will be transferred ──"
  else
    echo "── Deploying via FTP to $DEPLOY_FTP_HOST:$DEPLOY_PATH/.output/ ──"
  fi

  lftp -c "
    set ftp:ssl-allow yes
    set ftp:ssl-protect-data yes
    set ssl:verify-certificate no
    set net:max-retries 3
    set net:reconnect-interval-base 5
    open -u $DEPLOY_FTP_USER,$DEPLOY_FTP_PASS $DEPLOY_FTP_HOST
    $LFTP_OPTS .output/ $DEPLOY_PATH/.output/
    quit
  " 2>&1 | sanitize_output
else
  # ── SFTP (default) ──────────────────────────────────────────────
  if [[ "$DRY_RUN" == true ]]; then
    echo "── Dry run (SFTP) — no files will be transferred ──"
  else
    echo "── Deploying via SFTP to $DEPLOY_SSH_HOST:$DEPLOY_PATH/.output/ ──"
  fi

  lftp -c "
    set sftp:connect-program 'ssh -p $DEPLOY_SSH_PORT -o StrictHostKeyChecking=accept-new'
    set net:max-retries 3
    set net:reconnect-interval-base 5
    open -u $DEPLOY_SSH_USER,$DEPLOY_SSH_PASS sftp://$DEPLOY_SSH_HOST
    $LFTP_OPTS .output/ $DEPLOY_PATH/.output/
    quit
  " 2>&1 | sanitize_output
fi

# ── Post-deploy ───────────────────────────────────────────────────
if [[ "$DRY_RUN" == false ]]; then
  echo ""
  echo "Deploy complete!"
  echo ""
  echo "If this is the first deploy, configure Plesk Node.js extension:"
  echo "  • Application startup file: .output/server/index.mjs"
  echo "  • Application mode: production"
  echo "  • Do NOT run 'npm install' — the output is self-contained"
  echo ""
  echo "Restart the app in Plesk to pick up changes."
fi
