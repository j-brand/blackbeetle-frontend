export default function useValidators() {
  const isEmpty = (_fieldName: string, fieldValue: string): string => {
    return !fieldValue ? " - Dieses Feld darf nicht leer sein." : "";
  };

  const isEmail = (_fieldName: string, fieldValue: string): string => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(fieldValue) ? " - Die Eingabe ist keine gültige E-Mail-Adresse" : "";
  };

  const isRequired = (_fieldName: string, fieldValue: boolean): string => {
    return !fieldValue ? "Dieses Feld wird benötigt" : "";
  };

  return { isEmpty, isEmail, isRequired };
}
