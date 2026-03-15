import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ref } from "vue";
import useDetectOutsideClick from "~/composables/useDetectOutsideClick";

describe("useDetectOutsideClick", () => {
  it("should return a listener function when element ref is provided", () => {
    const element = ref(document.createElement("div"));
    const callback = vi.fn();

    const result = useDetectOutsideClick(element, callback);

    expect(result).toBeDefined();
    expect(result!.listener).toBeTypeOf("function");
  });

  it("should call callback for outside clicks", () => {
    const element = ref(document.createElement("div"));
    const callback = vi.fn();

    const result = useDetectOutsideClick(element, callback);

    // Simulate a click that doesn't contain the element in composedPath
    const outsideEvent = {
      target: document.createElement("span"),
      composedPath: () => [] as EventTarget[],
    } as unknown as MouseEvent;

    result!.listener(outsideEvent);

    expect(callback).toHaveBeenCalled();
  });

  it("should not call callback for inside clicks", () => {
    const el = document.createElement("div");
    const element = ref(el);
    const callback = vi.fn();

    const result = useDetectOutsideClick(element, callback);

    // Simulate a click where composedPath includes the element
    const insideEvent = {
      target: document.createElement("span"),
      composedPath: () => [el] as EventTarget[],
    } as unknown as MouseEvent;

    result!.listener(insideEvent);

    expect(callback).not.toHaveBeenCalled();
  });

  it("should call callback when target is the element itself", () => {
    const el = document.createElement("div");
    const element = ref(el);
    const callback = vi.fn();

    const result = useDetectOutsideClick(element, callback);

    // Click directly on the element (target === element.value)
    // The guard only returns early when target !== element AND composedPath includes element
    const directEvent = {
      target: el,
      composedPath: () => [el] as EventTarget[],
    } as unknown as MouseEvent;

    result!.listener(directEvent);

    expect(callback).toHaveBeenCalled();
  });

  it("should return listener even when element ref value is null (ref itself is truthy)", () => {
    const element = ref(null);
    const callback = vi.fn();

    const result = useDetectOutsideClick(element, callback);

    // ref(null) is a truthy object, so useDetectOutsideClick returns a listener
    expect(result).toBeDefined();
    expect(result!.listener).toBeTypeOf("function");
  });

  it("should handle element ref that becomes null after mount", () => {
    const el = document.createElement("div");
    const element = ref<HTMLElement | null>(el);
    const callback = vi.fn();

    const result = useDetectOutsideClick(element, callback);

    // Set element to null after setup
    element.value = null;

    // Simulate outside click — composedPath won't include null
    const outsideEvent = {
      target: document.createElement("span"),
      composedPath: () => [] as EventTarget[],
    } as unknown as MouseEvent;

    result!.listener(outsideEvent);

    // Should still call callback since target !== element.value (null)
    // and composedPath doesn't include null
    expect(callback).toHaveBeenCalled();
  });
});
