const validate = values => {
  const errors = {};

  if (!values.eventDate) {
    errors.eventDate = 'Обязательно';
  }

  if (!values.firstName) {
    errors.firstName = 'Обязательно';
  }
  if (!values.lastName) {
    errors.lastName = 'Обязательно';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.sex) {
    errors.sex = 'Обязательно';
  }
  if (!values.favoriteColor) {
    errors.favoriteColor = 'Обязательно';
  }
  return errors;
};

export default validate;