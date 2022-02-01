const nameRegexp = new RegExp(`(^([А-Я]{1})(([а-я]*))$)|(^([A-Z]{1})(([a-z]*))$)`);

export function validateName(name: string): string | undefined {
  if(!name.trim()) {
    return 'This field can not be empty';
  } else if (name.length === 1) {
    return 'Field value is too short. Minimum length is 2';
  } else if (!name.match(nameRegexp)) {
    return 'Invalid field value';
  }

  return;
}
