import React from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { SelectField } from 'redux-form-material-ui';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';

import Seats from '../../seats';
import validate from '../validate';

const ArenaStep = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="time" component={SelectField} hintText="Выберите время">
        <MenuItem value="1" primaryText="12:30 - 13:30"/>
        <MenuItem value="2" primaryText="14:30 - 15:30"/>
        <MenuItem value="3" primaryText="16:30 - 17:30"/>
      </Field>

      <Seats />

      <RaisedButton
        label="Далее"
        disableFocusRipple={true}
        primary={true}
        onClick={props.handleSubmit}
        style={{marginRight: 12}}
      />
      <FlatButton
        label="Назад"
        onClick={props.handlePrev}
      />

    </form>
  )
};

ArenaStep.propTypes = {
  handleSubmit: PropTypes.func,
  handlePrev: PropTypes.func
};

export default reduxForm({
  form: 'stepper', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ArenaStep)