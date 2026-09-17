import { describe, it, expect } from "vitest";
import { useGalleryLayout } from "~/composables/useGalleryLayout";
import type { IMedia, IMediaLayout } from "~/types";

function createMockMedia(
  layout?: IMediaLayout | null | unknown,
  custom: Record<string, unknown> = {},
): IMedia {
  return {
    id: 1,
    name: "dummy_06",
    file_name: "dummy_06.jpg",
    mime_type: "image/jpeg",
    size: 29762,
    order: 0,
    custom_properties: custom,
    urls: { original: "https://cdn.test.com/original.jpg" },
    ...(layout === undefined ? {} : { layout }),
  } as IMedia;
}

describe("useGalleryLayout", () => {
  const { getTile, getTileVariant, getFocalPoint, getCaption, getAltText } = useGalleryLayout();

  // =========================================================================
  // getTileVariant
  // =========================================================================
  describe("getTileVariant", () => {
    it("should pass through every variant the backend may send", () => {
      expect(getTileVariant(createMockMedia({ tile: "normal" }))).toBe("normal");
      expect(getTileVariant(createMockMedia({ tile: "wide" }))).toBe("wide");
      expect(getTileVariant(createMockMedia({ tile: "tall" }))).toBe("tall");
      expect(getTileVariant(createMockMedia({ tile: "large" }))).toBe("large");
    });

    it("should fall back to normal for an unknown tile name", () => {
      expect(getTileVariant(createMockMedia({ tile: "banner" }))).toBe("normal");
      expect(getTileVariant(createMockMedia({ tile: "" }))).toBe("normal");
      expect(getTileVariant(createMockMedia({ tile: "auto" }))).toBe("normal");
    });

    it("should not accept inherited object properties as a tile name", () => {
      // Guards the `includes` check — `in` would walk the prototype chain.
      expect(getTileVariant(createMockMedia({ tile: "toString" }))).toBe("normal");
      expect(getTileVariant(createMockMedia({ tile: "constructor" }))).toBe("normal");
    });

    it("should fall back to normal for a non-string tile", () => {
      expect(getTileVariant(createMockMedia({ tile: 2 }))).toBe("normal");
      expect(getTileVariant(createMockMedia({ tile: null }))).toBe("normal");
      expect(getTileVariant(createMockMedia({ tile: { size: "wide" } }))).toBe("normal");
    });

    it("should fall back to normal when layout is missing (video, PDF)", () => {
      expect(getTileVariant(createMockMedia())).toBe("normal");
      expect(getTileVariant(createMockMedia(null))).toBe("normal");
      expect(getTileVariant(createMockMedia("wide"))).toBe("normal");
    });

    it("should not throw for null/undefined media", () => {
      expect(getTileVariant(null)).toBe("normal");
      expect(getTileVariant(undefined)).toBe("normal");
    });

    it("should ignore aspect_ratio — the backend resolves the tile itself", () => {
      // Deriving the variant client-side would duplicate the backend
      // thresholds and defeat changing them without a frontend deploy.
      expect(getTileVariant(createMockMedia({ aspect_ratio: 2.4 }))).toBe("normal");
      expect(getTileVariant(createMockMedia({ aspect_ratio: 0.5 }))).toBe("normal");
    });
  });

  // =========================================================================
  // getTile — classes
  // =========================================================================
  describe("getTile().class", () => {
    // These assertions pin the literal strings. Tailwind v4 only emits classes
    // it finds verbatim in a source file, so composing them at runtime would
    // silently drop the spans from the bundle.
    it("should map each variant to its literal class chain", () => {
      expect(getTile(createMockMedia({ tile: "normal" })).class).toBe("row-span-3");
      expect(getTile(createMockMedia({ tile: "tall" })).class).toBe("row-span-6");
      expect(getTile(createMockMedia({ tile: "wide" })).class).toBe("col-span-2 row-span-5");
      expect(getTile(createMockMedia({ tile: "large" })).class).toBe("col-span-2 row-span-6");
    });

    it("should span rows on every breakpoint, not just lg", () => {
      // The row height is derived from the column width, so the tile ratios
      // hold everywhere. A prefixed span would hand phones a landscape slot for
      // a portrait photo and crop away most of its height.
      for (const tile of ["normal", "tall", "wide", "large"]) {
        expect(getTile(createMockMedia({ tile })).class).not.toMatch(/\b(?:sm|md|lg|xl):/);
      }
    });

    it("should keep normal at 3 rows to match the --tile-row formula", () => {
      // light-gallery.css divides the normal tile height by 3. If this span
      // changes, that divisor has to change with it.
      expect(getTile(createMockMedia({ tile: "normal" })).class).toBe("row-span-3");
    });
  });

  // =========================================================================
  // getTile — sizes
  // =========================================================================
  describe("getTile().sizes", () => {
    it("should serve wide tiles a larger candidate than normal ones", () => {
      const normal = getTile(createMockMedia({ tile: "normal" })).sizes;
      const wide = getTile(createMockMedia({ tile: "wide" })).sizes;

      expect(normal).toBe("(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw");
      expect(wide).toBe("(min-width: 1024px) 520px, (min-width: 640px) 66vw, 100vw");
      expect(wide).not.toBe(normal);
    });

    it("should ask for the full viewport width where a tile spans both columns", () => {
      // wide/large are full-bleed on a 2-column phone grid.
      expect(getTile(createMockMedia({ tile: "wide" })).sizes).toMatch(/100vw$/);
      expect(getTile(createMockMedia({ tile: "large" })).sizes).toMatch(/100vw$/);
      expect(getTile(createMockMedia({ tile: "normal" })).sizes).toMatch(/50vw$/);
    });

    it("should give large the same sizes as wide, and tall the same as normal", () => {
      expect(getTile(createMockMedia({ tile: "large" })).sizes).toBe(
        getTile(createMockMedia({ tile: "wide" })).sizes,
      );
      expect(getTile(createMockMedia({ tile: "tall" })).sizes).toBe(
        getTile(createMockMedia({ tile: "normal" })).sizes,
      );
    });
  });

  // =========================================================================
  // getFocalPoint / getTile().style
  // =========================================================================
  describe("getFocalPoint", () => {
    it("should pass through a usable object-position value", () => {
      expect(getFocalPoint(createMockMedia({ focal_point: "top right" }))).toBe("top right");
      expect(getFocalPoint(createMockMedia({ focal_point: "50% 25%" }))).toBe("50% 25%");
      expect(getFocalPoint(createMockMedia({ focal_point: "top" }))).toBe("top");
    });

    it("should normalise casing and whitespace", () => {
      expect(getFocalPoint(createMockMedia({ focal_point: "  LEFT   TOP " }))).toBe("left top");
    });

    it("should drop values that already are the CSS default", () => {
      expect(getFocalPoint(createMockMedia({ focal_point: "center" }))).toBe("");
      expect(getFocalPoint(createMockMedia({ focal_point: "center center" }))).toBe("");
      expect(getFocalPoint(createMockMedia({ focal_point: "50% 50%" }))).toBe("");
      expect(getFocalPoint(createMockMedia({ focal_point: "  CENTER  " }))).toBe("");
    });

    it("should return an empty string for a missing or non-string focal point", () => {
      expect(getFocalPoint(createMockMedia({ tile: "wide" }))).toBe("");
      expect(getFocalPoint(createMockMedia({ focal_point: null }))).toBe("");
      expect(getFocalPoint(createMockMedia({ focal_point: 42 }))).toBe("");
      expect(getFocalPoint(createMockMedia())).toBe("");
      expect(getFocalPoint(null)).toBe("");
    });
  });

  describe("getTile().style", () => {
    it("should expose the focal point as a custom property", () => {
      expect(getTile(createMockMedia({ focal_point: "top right" })).style).toEqual({
        "--tile-focal": "top right",
      });
    });

    it("should stay undefined when there is nothing worth emitting", () => {
      // undefined (not {}) makes Vue omit the style attribute entirely.
      expect(getTile(createMockMedia({ focal_point: "center" })).style).toBeUndefined();
      expect(getTile(createMockMedia()).style).toBeUndefined();
    });
  });

  // =========================================================================
  // getTile — determinism
  // =========================================================================
  describe("getTile", () => {
    it("should return a consistent variant, class and sizes", () => {
      const tile = getTile(createMockMedia({ tile: "large", focal_point: "top" }));

      expect(tile).toEqual({
        variant: "large",
        class: "col-span-2 row-span-6",
        sizes: "(min-width: 1024px) 520px, (min-width: 640px) 66vw, 100vw",
        style: { "--tile-focal": "top" },
      });
    });

    it("should not depend on the position in the list", () => {
      // Replaces the old `index % 8` formula: the same payload must always
      // produce the same tile, wherever the image sits in the album.
      const first = getTile(createMockMedia({ tile: "wide" }));
      const later = getTile(createMockMedia({ tile: "wide" }));

      expect(first).toEqual(later);
    });

    it("should not throw for media without custom properties", () => {
      const media = { id: 2, name: "x" } as unknown as IMedia;
      expect(() => getTile(media)).not.toThrow();
      expect(getTile(media).variant).toBe("normal");
    });
  });

  // =========================================================================
  // getCaption / getAltText
  // =========================================================================
  describe("getCaption", () => {
    it("should prefer caption over the deprecated description alias", () => {
      const media = createMockMedia(null, { caption: "Abends", description: "Alt" });
      expect(getCaption(media)).toBe("Abends");
    });

    it("should fall back to description while the backend still sends it", () => {
      expect(getCaption(createMockMedia(null, { description: "Alt" }))).toBe("Alt");
    });

    it("should fall back to the file name when nothing editorial is set", () => {
      expect(getCaption(createMockMedia())).toBe("dummy_06");
      expect(getCaption(createMockMedia(null, { caption: "" }))).toBe("dummy_06");
    });
  });

  describe("getAltText", () => {
    it("should prefer the dedicated alt text", () => {
      const media = createMockMedia(null, { alt_text: "Sonnenuntergang", caption: "Abends" });
      expect(getAltText(media)).toBe("Sonnenuntergang");
    });

    it("should fall back to the caption, then to the name", () => {
      expect(getAltText(createMockMedia(null, { caption: "Abends" }))).toBe("Abends");
      expect(getAltText(createMockMedia(null, { description: "Alt" }))).toBe("Alt");
      expect(getAltText(createMockMedia())).toBe("dummy_06");
    });
  });
});
