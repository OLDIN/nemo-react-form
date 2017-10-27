import React from 'react';
import PropTypes from 'prop-types';

import { reduxForm } from 'redux-form';
import validate from '../validate';

import RaisedButton from 'material-ui/RaisedButton';


const BuyStep = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} className={"first-page"}>

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

BuyStep.propTypes = {
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'stepper', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(BuyStep)