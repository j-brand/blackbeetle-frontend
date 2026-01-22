import { describe, it, expect } from "vitest";
import { reactive } from "vue";
import useButtonState from "~/composables/useButtonState";

describe("useButtonState", () => {
  it("should be disabled when fields are empty", () => {
    const fields = reactive({ name: "", email: "" });
    const errors = reactive<Record<string, string>>({});

    const { isDisabled } = useButtonState(fields, errors);

    expect(isDisabled.value).toBe(true);
  });

  it("should be disabled when there are errors", () => {
    const fields = reactive({ name: "John", email: "test@test.com" });
    const errors = reactive<Record<string, string>>({ email: "Invalid email" });

    const { isDisabled } = useButtonState(fields, errors);

    expect(isDisabled.value).toBe(true);
  });

  it("should be enabled when all fields are valid", () => {
    const fields = reactive({ name: "John", email: "test@test.com" });
    const errors = reactive<Record<string, string>>({});

    const { isDisabled } = useButtonState(fields, errors);

    expect(isDisabled.value).toBe(false);
  });

  it("should react to field changes", () => {
    const fields = reactive({ name: "", email: "" });
    const errors = reactive<Record<string, string>>({});

    const { isDisabled } = useButtonState(fields, errors);

    expect(isDisabled.value).toBe(true);

    fields.name = "John";
    fields.email = "test@test.com";

    expect(isDisabled.value).toBe(false);
  });

  it("should react to error changes", () => {
    const fields = reactive({ name: "John" });
    const errors = reactive<Record<string, string>>({});

    const { isDisabled } = useButtonState(fields, errors);

    expect(isDisabled.value).toBe(false);

    errors.name = "Name is required";

    expect(isDisabled.value).toBe(true);
  });
});
