export function isValidExperience(entry) {
  const stringFields = ['name', 'email', 'affiliation', 'program', 'location.country', 'location.city', 'external.institutions', 'external.partnerships', 'description'];
  for (const field of stringFields) {
    if (typeof entry[field] !== 'string' || entry[field].trim() === '') {
      return false;
    }
  };

  const boolFields = ['meta.isApproved', 'meta.isVisible', 'meta.contactVisible', 'duration.ongoing'];
  for (const field of boolFields) {
    if (typeof entry[field] !== 'boolean') {
      return false;
    }
  };

  if (!entry['duration.ongoing']) {
    const dateFields = ['duration.startDate', 'duration.endDate'];
    for (const field of dateFields) {
      if (typeof entry[field] !== 'string' || !isValidDate(entry[field])) {
        return false;
      }
    };
  }

  return true;
}

function isValidDate(dateString) {
  // Regular expression to match the format "YYYY-MM" (1900-2099)
  // TODO: add valid date library for more robust checks
  const regex = /^(19|20|21)\d{2}-(0[1-9]|1[0-2])$/;
  return regex.test(dateString);
}
