import React from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { DatePicker } from 'redux-form-material-ui';
import validate from '../validate';

import RaisedButton from 'material-ui/RaisedButton';


import Seats from '../../seats';

let DateTimeFormat = global.Intl.DateTimeFormat;

const DataStep = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} className={"first-page"}>
      <Field
        name="eventDate"
        component={DatePicker}
        format={(value, name) => value === '' ? null : value}
        DateTimeFormat={DateTimeFormat}
        hintText="Выберите дату"
        cancelLabel={'Отмена'}
        locale="ru-RU"
      />
      <Seats />
      <RaisedButton
        label="Далее"
        disableFocusRipple={true}
        primary={true}
        onClick={props.handleSubmit}
        style={{marginRight: 12}}
      />
    </form>
  )
};

DataStep.propTypes = {
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'stepper', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(DataStep)