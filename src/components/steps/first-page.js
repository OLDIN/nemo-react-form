import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { DatePicker } from 'redux-form-material-ui';
import validate from '../validate';
import renderField from '../../renderField';


let DateTimeFormat = global.Intl.DateTimeFormat;

const FirstPage = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="eventDate"
        component={DatePicker}
        format={(value, name) => value === '' ? null : value}
        DateTimeFormat={DateTimeFormat}
        hintText="Выберите дату"
        autoOk={true}
        cancelLabel={'Отмена'}
        locale="ru-RU"
      />
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="First Name"
      />
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="First Name"
      />
      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="Last Name"
      />
      <div>
        <button type="submit" className="next">
          Next
        </button>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'stepper', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FirstPage)