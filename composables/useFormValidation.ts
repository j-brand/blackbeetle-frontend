import useValidators from "./useValidators";

type InputError = Record<string, string>;

export default function useFormValidation() {
  const errors = reactive<InputError>({});
  const { isEmpty, isEmail, isRequired } = useValidators();

  const validateTextField = (fieldName: string, fieldValue: string): void => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : "";
  };

  const validateEmailField = (fieldName: string, fieldValue: string): void => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue);
  };

  const validateCheckbox = (fieldName: string, fieldValue: boolean): void => {
    errors[fieldName] = !fieldValue ? isRequired(fieldName, fieldValue) : "";
  };

  return { validateEmailField, validateTextField, validateCheckbox, errors };
}
