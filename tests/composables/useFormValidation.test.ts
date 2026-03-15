import { describe, it, expect } from "vitest";
import useFormValidation from "~/composables/useFormValidation";

describe("useFormValidation", () => {
  it("should create independent error state for each instance", () => {
    // First instance
    const { errors: errors1, validateTextField: validate1 } = useFormValidation();
    // Second instance
    const { errors: errors2 } = useFormValidation();

    // Validate on first instance
    validate1("test", "");

    // Check that errors are independent
    expect(errors1.test).toBe(" - Dieses Feld darf nicht leer sein.");
    expect(errors2.test).toBeUndefined();
  });

  it("should validate text field as empty when no value", () => {
    const { errors, validateTextField } = useFormValidation();

    validateTextField("name", "");

    expect(errors.name).toBe(" - Dieses Feld darf nicht leer sein.");
  });

  it("should clear error when text field has value", () => {
    const { errors, validateTextField } = useFormValidation();

    validateTextField("name", "");
    expect(errors.name).toBe(" - Dieses Feld darf nicht leer sein.");

    validateTextField("name", "John");
    expect(errors.name).toBe("");
  });

  it("should validate email format", () => {
    const { errors, validateEmailField } = useFormValidation();

    validateEmailField("email", "invalid-email");
    expect(errors.email).toBe(" - Die Eingabe ist keine gültige E-Mail-Adresse");

    validateEmailField("email", "valid@email.com");
    expect(errors.email).toBe("");
  });

  it("should validate checkbox as required", () => {
    const { errors, validateCheckbox } = useFormValidation();

    validateCheckbox("terms", false);
    expect(errors.terms).toBe("Dieses Feld wird benötigt");

    validateCheckbox("terms", true);
    expect(errors.terms).toBe("");
  });

  // =========================================================================
  // XSS payload handling
  // =========================================================================
  it("should accept XSS payloads as valid text (sanitization is output-side)", () => {
    const { errors, validateTextField } = useFormValidation();

    validateTextField("name", '<script>alert("xss")</script>');
    expect(errors.name).toBe("");
  });

  it("should accept XSS payloads in email field when format is valid email", () => {
    const { errors, validateEmailField } = useFormValidation();

    validateEmailField("email", "valid@example.com");
    expect(errors.email).toBe("");
  });

  it("should reject XSS payloads that are not valid emails", () => {
    const { errors, validateEmailField } = useFormValidation();

    validateEmailField("email", '<script>alert("xss")</script>');
    expect(errors.email).toBe(" - Die Eingabe ist keine gültige E-Mail-Adresse");
  });

  it("should reject event handler payloads in email field", () => {
    const { errors, validateEmailField } = useFormValidation();

    validateEmailField("email", '" onmouseover="alert(1)"');
    expect(errors.email).toBe(" - Die Eingabe ist keine gültige E-Mail-Adresse");
  });

  // =========================================================================
  // Whitespace-only input
  // =========================================================================
  it("should accept whitespace-only text as non-empty (truthy string)", () => {
    const { errors, validateTextField } = useFormValidation();

    validateTextField("name", "   ");
    expect(errors.name).toBe("");
  });
});
