const validate = values => {
  const errors = {};

  if (!values.eventDate) {
    errors.eventDate = 'Обязательно';
  }

  if (!values.fullName) {
    errors.fullName = 'Обязательно';
  }

  if (!values.email) {
    errors.email = 'Обязательно';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Несуществующая почта';
  }

  if (!values.phone) {
    errors.phone = 'Обязательно';
  }

  return errors;
};

export default validate;