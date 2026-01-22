type FormFields = Record<string, unknown>;
type FormErrors = Record<string, string>;

export default function useButtonState(fields: FormFields, errors: FormErrors) {
  const isDisabled = computed(() => {
    let disabled = true;
    for (const prop in fields) {
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
