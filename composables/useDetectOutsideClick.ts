import type { Ref } from "vue";

export default function useDetectOutsideClick(
  element: Ref<HTMLElement | null>,
  callback: () => void
): { listener: (event: MouseEvent) => void } | undefined {
  if (!element) return;

  const listener = (event: MouseEvent): void => {
    if (event.target !== element.value && event.composedPath().includes(element.value as EventTarget)) {
      return;
    }
    if (typeof callback === "function") {
      callback();
    }
  };

  onMounted(() => {
    window.addEventListener("click", listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });

  return { listener };
}
