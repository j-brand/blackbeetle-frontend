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
  function getMediaObj(media: IMedia, variant: "thumb" | "preview" | "original" = "preview") {
    return {
      src: media.urls[variant] ?? media.urls.original,
      loading: media.urls.thumb ?? media.urls.original,
    };
  }

  /**
   * Get URL for a specific media variant
   */
  function getMediaUrl(media: IMedia, variant: "thumb" | "preview" | "original" = "original"): string {
    return media.urls[variant] ?? media.urls.original;
  }

  return { slugify, formatDate, getExcerpt, getMediaObj, getMediaUrl };
}
