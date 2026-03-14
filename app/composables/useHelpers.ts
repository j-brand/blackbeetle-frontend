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

  /**
   * Get image object for lazy loading with new MediaResource structure
   */
  function getMediaObj(media: IMedia | null | undefined, variant: string = "preview") {
    if (!media?.urls) return { src: "", loading: "" };
    return {
      src: media.urls[variant] ?? media.urls.original,
      loading: media.urls.thumb ?? media.urls.original,
    };
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
    // never fall back to original JPG — use largest available webp variant
    return media.urls.large ?? media.urls.medium ?? media.urls.original;
  }

  return { slugify, formatDate, getExcerpt, getMediaObj, getMediaUrl, getBestMediaUrl };
}
