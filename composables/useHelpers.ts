import { IImage } from "@/types";

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

  function formatDate(date: string | Date, short?: boolean): string {
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

  function getExcerpt(text: string, length: number): string {
    let excerpt = text;
    if (excerpt.length >= length) {
      excerpt = excerpt.substring(0, length) + "...";
    }
    return excerpt;
  }

  function getImgObj(image: IImage, variant: string) {
    return {
      src: getImgPath(image, variant),
      loading: getImgPath(image, `${variant}_lazy`),
    };
  }

  function getImgPath(image: IImage, variant: string): string {
    return `${useRuntimeConfig().public.backendUrl}/storage/${image.path}${image.title}${variant}.${image.extension}`;
  }

  return { slugify, formatDate, getExcerpt, getImgObj, getImgPath };
}
