import useValidators from "./useValidators";

type inputError = {
  email?: string;
  text?: string;
  checkbox?: string;
};

const errors = reactive<inputError>({});

export default function useFormValidation() {
  const { isEmpty, minLength, isEmail, isRequired } = useValidators();

  const validateTextField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : "";
  };

  const validateEmailField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue);
  };

  const validateCheckbox = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isRequired(fieldName, fieldValue) : "";
  };

  return { validateEmailField, validateTextField, validateCheckbox, errors };
}
