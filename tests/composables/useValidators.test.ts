import { describe, it, expect } from "vitest";
import useValidators from "~/composables/useValidators";

describe("useValidators", () => {
  const { isEmpty, isEmail, isRequired } = useValidators();

  // =========================================================================
  // isEmpty
  // =========================================================================
  describe("isEmpty", () => {
    it("should return error message for empty string", () => {
      expect(isEmpty("name", "")).toBe(" - Dieses Feld darf nicht leer sein.");
    });

    it("should return empty string for non-empty value", () => {
      expect(isEmpty("name", "John")).toBe("");
    });

    it("should return empty string for whitespace (non-empty)", () => {
      expect(isEmpty("name", " ")).toBe("");
    });
  });

  // =========================================================================
  // isEmail
  // =========================================================================
  describe("isEmail", () => {
    it("should return empty string for valid email", () => {
      expect(isEmail("email", "user@example.com")).toBe("");
    });

    it("should return error for invalid email (no @)", () => {
      expect(isEmail("email", "invalid-email")).toBe(
        " - Die Eingabe ist keine gültige E-Mail-Adresse"
      );
    });

    it("should return error for invalid email (no domain)", () => {
      expect(isEmail("email", "user@")).toBe(
        " - Die Eingabe ist keine gültige E-Mail-Adresse"
      );
    });

    it("should return error for invalid email (no TLD)", () => {
      expect(isEmail("email", "user@domain")).toBe(
        " - Die Eingabe ist keine gültige E-Mail-Adresse"
      );
    });

    it("should accept email with subdomain", () => {
      expect(isEmail("email", "user@mail.example.com")).toBe("");
    });

    it("should accept email with dots in local part", () => {
      // Note: The regex has a known limitation with dots in local part
      // After fixing the regex, this should pass
      expect(isEmail("email", "first.last@example.com")).toBe("");
    });

    it("should accept email with plus sign", () => {
      expect(isEmail("email", "user+tag@example.com")).toBe("");
    });

    it("should return error for empty string", () => {
      expect(isEmail("email", "")).toBe(
        " - Die Eingabe ist keine gültige E-Mail-Adresse"
      );
    });
  });

  // =========================================================================
  // isRequired
  // =========================================================================
  describe("isRequired", () => {
    it("should return error message when false", () => {
      expect(isRequired("terms", false)).toBe("Dieses Feld wird benötigt");
    });

    it("should return empty string when true", () => {
      expect(isRequired("terms", true)).toBe("");
    });
  });

  // =========================================================================
  // Unicode edge cases
  // =========================================================================
  describe("isEmail - Unicode edge cases", () => {
    it("should accept email with Unicode local part (regex limitation)", () => {
      // Current regex accepts Unicode chars — this documents the behavior
      expect(isEmail("email", "üser@example.com")).toBe("");
    });

    it("should reject email with Unicode domain", () => {
      expect(isEmail("email", "user@exämple.com")).toBe(
        " - Die Eingabe ist keine gültige E-Mail-Adresse"
      );
    });

    it("should accept email with emoji in local part (regex limitation)", () => {
      // Current regex accepts emoji — this documents the behavior
      expect(isEmail("email", "user🎉@example.com")).toBe("");
    });

    it("should accept email with hyphens in domain", () => {
      expect(isEmail("email", "user@my-domain.com")).toBe("");
    });

    it("should accept email with numbers in domain", () => {
      expect(isEmail("email", "user@123domain.com")).toBe("");
    });
  });

  // =========================================================================
  // isEmpty edge cases
  // =========================================================================
  describe("isEmpty - edge cases", () => {
    it("should treat whitespace-only as non-empty (truthy)", () => {
      expect(isEmpty("name", "   ")).toBe("");
    });

    it("should treat tab character as non-empty", () => {
      expect(isEmpty("name", "\t")).toBe("");
    });

    it("should treat newline as non-empty", () => {
      expect(isEmpty("name", "\n")).toBe("");
    });
  });
});
