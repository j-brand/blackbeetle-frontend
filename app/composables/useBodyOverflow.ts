import type { Ref } from "vue";

/**
 * Locks/unlocks page scrolling in response to a reactive boolean,
 * keeping the direct `document.body` write in one reactive-friendly place
 * instead of scattering it across components.
 */
export function useBodyOverflow(isLocked: Ref<boolean>) {
  if (import.meta.server) return;

  watch(
    isLocked,
    (locked) => {
      document.body.style.overflowY = locked ? "hidden" : "scroll";
    },
    { immediate: true }
  );

  onScopeDispose(() => {
    document.body.style.overflowY = "scroll";
  });
}
