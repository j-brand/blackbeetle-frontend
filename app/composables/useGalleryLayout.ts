import type { IGalleryTile, IMedia, TileVariant } from "@/types";

/**
 * Per-image gallery tile layout. The backend resolves `auto` and the focal
 * point, so this only maps the result onto classes and validates defensively:
 * `layout` is absent for non-image media (video, PDF).
 */
export function useGalleryLayout() {
  const TILE_VARIANTS = ["normal", "wide", "tall", "large"] as const;

  // These strings MUST stay literal. Tailwind v4 only emits classes it finds
  // verbatim in a source file — never build them from fragments.
  //
  // Row counts are chosen so each tile matches a real photo format: with the
  // row height derived from the column width (see `--tile-row` in
  // light-gallery.css), normal is 3:2, tall ~0.71, wide ~1.79 (16:9) and large
  // ~1.48. No breakpoint prefixes: the ratios now hold at every viewport, and a
  // portrait without its row span would lose up to 62% of its height on a phone.
  // The 3 rows of `normal` MUST match the divisor in the --tile-row formula.
  const TILE_CLASSES: Readonly<Record<TileVariant, string>> = Object.freeze({
    normal: "row-span-3",
    tall: "row-span-6",
    wide: "col-span-2 row-span-5",
    large: "col-span-2 row-span-6",
  });

  // A column is 244px once the 1024px container is fully unfolded — that needs a
  // viewport of 1120px, because <main> adds `lg:px-12`; between 1024 and 1119 it
  // is 220–244px. A col-span-2 tile is then 504px.
  // wide/large span both columns on a phone, so their smallest slot is the full
  // viewport width, not half of it.
  const TILE_SIZES: Readonly<Record<TileVariant, string>> = Object.freeze({
    normal: "(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw",
    tall: "(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw",
    wide: "(min-width: 1024px) 520px, (min-width: 640px) 66vw, 100vw",
    large: "(min-width: 1024px) 520px, (min-width: 640px) 66vw, 100vw",
  });

  // Already the CSS default — emitting it would only bloat the SSR markup,
  // `var(--tile-focal, center)` covers it.
  const NEUTRAL_FOCALS = new Set(["center", "center center", "50%", "50% 50%"]);

  function getTileVariant(media: IMedia | null | undefined): TileVariant {
    const tile = media?.layout?.tile;
    // `includes` rather than `in`: `in` walks the prototype chain, so a
    // payload of "toString" would pass.
    return typeof tile === "string" && (TILE_VARIANTS as readonly string[]).includes(tile)
      ? (tile as TileVariant)
      : "normal";
  }

  /**
   * Normalised `object-position`, or "" when there is nothing worth emitting.
   * Validation is deliberately light: Vue writes custom properties via
   * `style.setProperty()`, so no attribute injection is possible, and an
   * unparsable value makes `object-position` invalid at computed-value time,
   * which falls back to the initial `50% 50%` anyway.
   */
  function getFocalPoint(media: IMedia | null | undefined): string {
    const raw = media?.layout?.focal_point;
    if (typeof raw !== "string") return "";
    const focal = raw.trim().toLowerCase().replace(/\s+/g, " ");
    return focal && !NEUTRAL_FOCALS.has(focal) ? focal : "";
  }

  /** Everything a tile needs, resolved once per image. */
  function getTile(media: IMedia | null | undefined): IGalleryTile {
    const variant = getTileVariant(media);
    const focal = getFocalPoint(media);
    return {
      variant,
      class: TILE_CLASSES[variant],
      style: focal ? { "--tile-focal": focal } : undefined,
      sizes: TILE_SIZES[variant],
    };
  }

  /**
   * Caption for the lightbox and the hover overlay. `description` is a
   * deprecated backend alias of `caption`, kept as a bridge until the backend
   * drops it.
   */
  function getCaption(media: IMedia): string {
    const props = media?.custom_properties ?? {};
    return (props.caption as string) || (props.description as string) || media?.name || "";
  }

  function getAltText(media: IMedia): string {
    return (media?.custom_properties?.alt_text as string) || getCaption(media);
  }

  return { getTile, getTileVariant, getFocalPoint, getCaption, getAltText };
}
