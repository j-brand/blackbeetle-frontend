export default function useValidators() {
  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? " - Das " + fieldName + " feld ist erforderlich." : "";
  };

  const minLength = (fieldName, fieldValue, min) => {
    return fieldValue.length < min ? ` - Das ${fieldName} muss mindestens ${min} Zeichen lang sein.` : "";
  };

  const isEmail = (fieldName, fieldValue) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(fieldValue) ? "Die eingabe ist keine gülitige E-Mail-Adresse " + fieldName + " " : "";
  };
  return { isEmpty, minLength, isEmail };
}
