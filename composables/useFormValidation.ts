import useValidators from "./useValidators";

const errors = ref({});

export default function useFormValidation() {
  const { isEmpty, minLength, isEmail } = useValidators();

  const validateTextField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : "";
  };

  return { validateTextField, errors };
}
