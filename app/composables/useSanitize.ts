/**
 * Lightweight HTML sanitizer to prevent XSS when rendering trusted CMS content.
 * Strips dangerous tags (script, iframe, object, embed, form, etc.) and
 * event-handler attributes (onclick, onerror, onload, etc.).
 */
export function useSanitize() {
  const SCRIPT_CONTENT = /<\s*script\b[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi;
  const DANGEROUS_TAGS = /(<\s*\/?\s*)(script|iframe|object|embed|form|input|button|link|meta|base|applet)([\s>\/])/gi;
  const EVENT_HANDLERS = /\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
  const JAVASCRIPT_URLS = /(href|src|action)\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*')/gi;
  const DATA_URLS = /(href|src|action)\s*=\s*(?:"data:[^"]*"|'data:[^']*')/gi;

  function sanitizeHtml(dirty: string | null | undefined): string {
    if (!dirty) return "";

    let clean = dirty;

    // Remove script tags AND their content entirely
    clean = clean.replace(SCRIPT_CONTENT, "");

    // Remove remaining dangerous tags (opening and closing)
    clean = clean.replace(DANGEROUS_TAGS, "");

    // Remove event handler attributes (onclick, onerror, onload, etc.)
    clean = clean.replace(EVENT_HANDLERS, "");

    // Remove javascript: protocol URLs
    clean = clean.replace(JAVASCRIPT_URLS, "");

    // Remove data: protocol URLs (can be used for XSS)
    clean = clean.replace(DATA_URLS, "");

    return clean;
  }

  return { sanitizeHtml };
}
