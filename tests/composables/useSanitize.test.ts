import { describe, it, expect } from "vitest";
import { useSanitize } from "~/composables/useSanitize";

describe("useSanitize", () => {
  const { sanitizeHtml } = useSanitize();

  // =========================================================================
  // Null / empty / safe inputs
  // =========================================================================
  it("returns empty string for null", () => {
    expect(sanitizeHtml(null)).toBe("");
  });

  it("returns empty string for undefined", () => {
    expect(sanitizeHtml(undefined)).toBe("");
  });

  it("returns empty string for empty string", () => {
    expect(sanitizeHtml("")).toBe("");
  });

  it("preserves safe HTML", () => {
    const safe = '<p>Hello <strong>world</strong></p>';
    expect(sanitizeHtml(safe)).toBe(safe);
  });

  it("preserves links with safe href", () => {
    const safe = '<a href="https://example.com">Link</a>';
    expect(sanitizeHtml(safe)).toBe(safe);
  });

  it("preserves images with safe src", () => {
    const safe = '<img src="https://example.com/img.jpg" alt="test" />';
    expect(sanitizeHtml(safe)).toBe(safe);
  });

  // =========================================================================
  // Script tag removal
  // =========================================================================
  it("removes script tags and their content entirely", () => {
    const dirty = '<p>Hello</p><script>alert("xss")</script>';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("<script");
    expect(result).not.toContain("</script");
    expect(result).not.toContain("alert");
    expect(result).toBe("<p>Hello</p>");
  });

  it("removes script tags with attributes and content", () => {
    const dirty = '<script type="text/javascript">alert("xss")</script>';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("<script");
    expect(result).not.toContain("alert");
    expect(result).toBe("");
  });

  it("removes closing script tags", () => {
    const dirty = '</script>';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("</script");
  });

  // =========================================================================
  // Dangerous tag removal
  // =========================================================================
  it("removes iframe tags", () => {
    const dirty = '<iframe src="https://evil.com"></iframe>';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("<iframe");
  });

  it("removes object tags", () => {
    const dirty = '<object data="evil.swf"></object>';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("<object");
  });

  it("removes embed tags", () => {
    const dirty = '<embed src="evil.swf">';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("<embed");
  });

  it("removes form tags", () => {
    const dirty = '<form action="evil.com"><input type="text"></form>';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("<form");
    expect(result).not.toContain("<input");
  });

  it("removes link tags", () => {
    const dirty = '<link rel="stylesheet" href="evil.css">';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("<link");
  });

  it("removes meta tags", () => {
    const dirty = '<meta http-equiv="refresh" content="0;url=evil.com">';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("<meta");
  });

  it("removes base tags", () => {
    const dirty = '<base href="https://evil.com/">';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("<base");
  });

  // =========================================================================
  // Event handler removal
  // =========================================================================
  it("removes onclick handlers", () => {
    const dirty = '<p onclick="alert(1)">Click</p>';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("onclick");
    expect(result).toContain("<p");
    expect(result).toContain("Click</p>");
  });

  it("removes onerror handlers", () => {
    const dirty = '<img src="x" onerror="alert(1)">';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("onerror");
  });

  it("removes onload handlers", () => {
    const dirty = '<body onload="alert(1)">';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("onload");
  });

  it("removes onmouseover handlers", () => {
    const dirty = '<div onmouseover="alert(1)">Hover</div>';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("onmouseover");
  });

  it("removes event handlers with single quotes", () => {
    const dirty = "<p onclick='alert(1)'>Click</p>";
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("onclick");
  });

  // =========================================================================
  // javascript: URL removal
  // =========================================================================
  it("removes javascript: href", () => {
    const dirty = '<a href="javascript:alert(1)">Click</a>';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("javascript:");
  });

  it("removes javascript: src", () => {
    const dirty = '<img src="javascript:alert(1)">';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("javascript:");
  });

  // =========================================================================
  // data: URL removal
  // =========================================================================
  it("removes data: href", () => {
    const dirty = '<a href="data:text/html,<script>alert(1)</script>">click</a>';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("data:");
  });

  // =========================================================================
  // Combined attacks
  // =========================================================================
  it("handles multiple attack vectors", () => {
    const dirty = '<p onclick="alert(1)">Text</p><script>evil()</script><iframe src="evil"></iframe>';
    const result = sanitizeHtml(dirty);
    expect(result).not.toContain("<script");
    expect(result).not.toContain("evil()");
    expect(result).not.toContain("onclick");
    expect(result).not.toContain("<iframe");
    expect(result).toContain("Text</p>");
  });
});
