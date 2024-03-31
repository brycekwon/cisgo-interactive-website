export function isValidDate(dateString) {
  // Regular expression to match the format "YYYY-MM" (1900-2099)
  // TODO: add valid date library for more robust checks
  const regex = /^(19|20|21)\d{2}-(0[1-9]|1[0-2])$/;
  return regex.test(dateString);
}
