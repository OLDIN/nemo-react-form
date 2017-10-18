import React from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {Grid, Cell} from 'material-grid/dist';
import validate from '../validate';

import MenuItem from 'material-ui/MenuItem';
import { SelectField } from 'redux-form-material-ui';

// import IconDiving from '../icons/diving.svg';
// import IconDay from '../icons/day.svg';
// import IconAquarium from '../icons/aquarium.svg';
// import IconNight from '../icons/night.svg';
// import IconSwimming from '../icons/swimming.svg';

const ArenaStep = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="time" component={SelectField} hintText="Выберите время">
        <MenuItem value="1" primaryText="12:30 - 13:30"/>
        <MenuItem value="2" primaryText="14:30 - 15:30"/>
        <MenuItem value="3" primaryText="16:30 - 17:30"/>
      </Field>
      <Grid>
        <Cell col={4} tablet={4} phone={2}>
            <p>Романтическое ночное шоу</p>
        </Cell>

      </Grid>
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