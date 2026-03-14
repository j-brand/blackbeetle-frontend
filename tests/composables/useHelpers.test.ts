import { describe, it, expect } from "vitest";
import { useHelper } from "~/composables/useHelpers";
import type { IMedia } from "~/types";

// Helper to create a mock IMedia object
function createMockMedia(urls: Record<string, string> = {}): IMedia {
  return {
    id: 1,
    name: "test.jpg",
    file_name: "test.jpg",
    mime_type: "image/jpeg",
    size: 1024,
    order: 0,
    custom_properties: {},
    urls: {
      original: "https://cdn.test.com/original.jpg",
      ...urls,
    },
  };
}

describe("useHelper", () => {
  const { slugify, formatDate, getExcerpt, getMediaObj, getMediaUrl, getBestMediaUrl } = useHelper();

  // =========================================================================
  // slugify
  // =========================================================================
  describe("slugify", () => {
    it("should convert text to lowercase slug", () => {
      expect(slugify("Hello World")).toBe("hello-world");
    });

    it("should remove special characters", () => {
      expect(slugify("Hello! World? Yes.")).toBe("hello-world-yes");
    });

    it("should collapse multiple spaces/dashes", () => {
      expect(slugify("hello   world---test")).toBe("hello-world-test");
    });

    it("should trim leading/trailing dashes", () => {
      expect(slugify("--hello-world--")).toBe("hello-world");
    });

    it("should handle empty string", () => {
      expect(slugify("")).toBe("");
    });

    it("should handle underscores", () => {
      expect(slugify("hello_world_test")).toBe("hello-world-test");
    });

    it("should strip accented and special UTF characters", () => {
      expect(slugify("Café & Résumé")).toBe("caf-rsum");
    });
  });

  // =========================================================================
  // formatDate
  // =========================================================================
  describe("formatDate", () => {
    it("should format a date string in German long format", () => {
      const result = formatDate("2025-03-15");
      expect(result).toBe("15.März.2025");
    });

    it("should format a date string in German short format", () => {
      const result = formatDate("2025-03-15", true);
      expect(result).toBe("15.Mär.2025");
    });

    it("should handle Date objects", () => {
      const date = new Date(2025, 0, 1); // January 1, 2025
      const result = formatDate(date);
      expect(result).toBe("1.Januar.2025");
    });

    it("should return empty string for null", () => {
      expect(formatDate(null)).toBe("");
    });

    it("should return empty string for undefined", () => {
      expect(formatDate(undefined)).toBe("");
    });

    it("should return empty string for empty string", () => {
      expect(formatDate("")).toBe("");
    });

    it("should format all months correctly (long)", () => {
      const months = [
        "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember",
      ];
      months.forEach((month, index) => {
        const date = new Date(2025, index, 1);
        expect(formatDate(date)).toContain(month);
      });
    });

    it("should format all months correctly (short)", () => {
      const months = [
        "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
        "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
      ];
      months.forEach((month, index) => {
        const date = new Date(2025, index, 1);
        expect(formatDate(date, true)).toContain(month);
      });
    });
  });

  // =========================================================================
  // getExcerpt
  // =========================================================================
  describe("getExcerpt", () => {
    it("should return full text when shorter than length", () => {
      expect(getExcerpt("Hello", 100)).toBe("Hello");
    });

    it("should truncate text and add ellipsis", () => {
      expect(getExcerpt("Hello World, this is a very long text", 10)).toBe("Hello Worl...");
    });

    it("should return empty string for null", () => {
      expect(getExcerpt(null, 100)).toBe("");
    });

    it("should return empty string for undefined", () => {
      expect(getExcerpt(undefined, 100)).toBe("");
    });

    it("should return empty string for empty text", () => {
      expect(getExcerpt("", 100)).toBe("");
    });

    it("should truncate when text length equals limit (uses >=)", () => {
      expect(getExcerpt("12345", 5)).toBe("12345...");
    });

    it("should truncate one char over the limit", () => {
      expect(getExcerpt("123456", 5)).toBe("12345...");
    });

    it("should not truncate when text is shorter than limit", () => {
      expect(getExcerpt("1234", 5)).toBe("1234");
    });
  });

  // =========================================================================
  // getMediaObj
  // =========================================================================
  describe("getMediaObj", () => {
    it("should return preview src and thumb loading by default", () => {
      const media = createMockMedia({
        preview: "https://cdn.test.com/preview.webp",
        thumb: "https://cdn.test.com/thumb.webp",
      });

      const result = getMediaObj(media);

      expect(result.src).toBe("https://cdn.test.com/preview.webp");
      expect(result.loading).toBe("https://cdn.test.com/thumb.webp");
    });

    it("should fall back to original when variant is missing", () => {
      const media = createMockMedia();

      const result = getMediaObj(media, "large");

      expect(result.src).toBe("https://cdn.test.com/original.jpg");
      expect(result.loading).toBe("https://cdn.test.com/original.jpg");
    });

    it("should use specified variant", () => {
      const media = createMockMedia({
        medium: "https://cdn.test.com/medium.webp",
      });

      const result = getMediaObj(media, "medium");

      expect(result.src).toBe("https://cdn.test.com/medium.webp");
    });

    it("should return empty strings for null media", () => {
      const result = getMediaObj(null);

      expect(result.src).toBe("");
      expect(result.loading).toBe("");
    });

    it("should return empty strings for undefined media", () => {
      const result = getMediaObj(undefined);

      expect(result.src).toBe("");
      expect(result.loading).toBe("");
    });
  });

  // =========================================================================
  // getMediaUrl
  // =========================================================================
  describe("getMediaUrl", () => {
    it("should return original URL by default", () => {
      const media = createMockMedia();
      expect(getMediaUrl(media)).toBe("https://cdn.test.com/original.jpg");
    });

    it("should return specified variant URL", () => {
      const media = createMockMedia({
        large: "https://cdn.test.com/large.webp",
      });
      expect(getMediaUrl(media, "large")).toBe("https://cdn.test.com/large.webp");
    });

    it("should fall back to original for missing variant", () => {
      const media = createMockMedia();
      expect(getMediaUrl(media, "nonexistent")).toBe("https://cdn.test.com/original.jpg");
    });

    it("should return empty string for null media", () => {
      expect(getMediaUrl(null)).toBe("");
    });

    it("should return empty string for undefined media", () => {
      expect(getMediaUrl(undefined)).toBe("");
    });
  });

  // =========================================================================
  // getBestMediaUrl
  // =========================================================================
  describe("getBestMediaUrl", () => {
    it("should return first matching variant", () => {
      const media = createMockMedia({
        large: "https://cdn.test.com/large.webp",
        medium: "https://cdn.test.com/medium.webp",
      });

      expect(getBestMediaUrl(media, "large", "medium")).toBe("https://cdn.test.com/large.webp");
    });

    it("should skip missing variants and return next available", () => {
      const media = createMockMedia({
        medium: "https://cdn.test.com/medium.webp",
      });

      expect(getBestMediaUrl(media, "large", "medium")).toBe("https://cdn.test.com/medium.webp");
    });

    it("should fall back to large > medium > original", () => {
      const media = createMockMedia({
        large: "https://cdn.test.com/large.webp",
      });

      expect(getBestMediaUrl(media, "webp")).toBe("https://cdn.test.com/large.webp");
    });

    it("should fall back to medium when large is missing", () => {
      const media = createMockMedia({
        medium: "https://cdn.test.com/medium.webp",
      });

      expect(getBestMediaUrl(media, "webp")).toBe("https://cdn.test.com/medium.webp");
    });

    it("should fall back to original when all variants are missing", () => {
      const media = createMockMedia();

      expect(getBestMediaUrl(media, "webp")).toBe("https://cdn.test.com/original.jpg");
    });

    it("should return empty string for null media", () => {
      expect(getBestMediaUrl(null, "large")).toBe("");
    });

    it("should return empty string for undefined media", () => {
      expect(getBestMediaUrl(undefined, "large")).toBe("");
    });
  });
});
