import { computed } from "vue";

export default function useButtonState(fields, errors) {
  const isDisabled = computed(() => {
    let disabled = true;
    for (let prop in fields) {
      if (!fields[prop] || errors[prop]) {
        disabled = true;
        break;
      }

      disabled = false;
    }
    return disabled;
  });
  return { isDisabled };
}
