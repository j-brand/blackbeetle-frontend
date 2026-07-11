import type { IMedia } from "@/types";

export function useHelper() {
  function slugify(str: string): string {
    const slug = str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return slug;
  }

  function formatDate(date: string | Date | null | undefined, short?: boolean): string {
    if (!date) return "";
    //format date to t.m.Y
    let months: string[] = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    if (short) {
      months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
    }
    const d: Date = new Date(date);
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    return day + "." + months[month] + "." + year;
  }

  function getExcerpt(text: string | null | undefined, length: number): string {
    if (!text) return "";
    let excerpt = text;
    if (excerpt.length >= length) {
      excerpt = excerpt.substring(0, length) + "...";
    }
    return excerpt;
  }

  // Pixel widths of the backend (Spatie) size conversions. These MUST match the
  // backend conversion widths, otherwise the srcset descriptors lie and the
  // browser up-/down-selects the wrong file. Keep in sync with the backend.
  const VARIANT_WIDTHS: Record<string, number> = {
    medium: 650,
    large: 1400,
    webp: 1920,
  };

  /**
   * Build a responsive srcset string from the available size variants.
   * Prefers webp URLs when present, clamps descriptors to the original width,
   * and returns "" when no sized variants are available.
   */
  function getMediaSrcset(media: IMedia | null | undefined): string {
    if (!media?.urls) return "";
    const originalWidth = Number(media.custom_properties?.width) || Infinity;
    const entries: string[] = [];
    for (const [variant, width] of Object.entries(VARIANT_WIDTHS)) {
      const url = media.urls[variant];
      if (!url) continue;
      const w = Math.min(width, originalWidth);
      entries.push(`${url} ${w}w`);
    }
    return entries.join(", ");
  }

  /**
   * Get URL for a specific media variant
   */
  function getMediaUrl(media: IMedia | null | undefined, variant: string = "original"): string {
    if (!media?.urls) return "";
    return media.urls[variant] ?? media.urls.original;
  }

  /**
   * Get the best available media URL from a list of preferred variants
   */
  function getBestMediaUrl(media: IMedia | null | undefined, ...variants: string[]): string {
    if (!media?.urls) return "";
    for (const variant of variants) {
      if (media.urls[variant]) return media.urls[variant]!;
    }
    // never fall back to original JPG — use largest available variant
    return media.urls.webp ?? media.urls.large ?? media.urls.medium ?? media.urls.thumb ?? media.urls.original;
  }

  return { slugify, formatDate, getExcerpt, getMediaSrcset, getMediaUrl, getBestMediaUrl };
}
