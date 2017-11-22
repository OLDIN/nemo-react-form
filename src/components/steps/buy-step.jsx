import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
// import InputMask from 'react-input-mask'

import validate from '../validate';

import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    autoComplete="off"
  >
    {/*<InputMask mask="+38 (099) 999 99 99" maskChar="-" />*/}
  </TextField>
)

const renderCheckbox = ({ input, label }) => (
  <Toggle
    label={label}
    toggled={input.value ? true : false}
    onToggle={input.onChange}
    defaultToggled={false}
  />
)

class BuyStep extends Component {

  calcPriceTicket() {
    const { basket } = this.props;

    return basket.reduce((prev, cur) => prev += cur.price, 0);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} className={"first-page"}>

        <div>
          <Field name="fullName" component={renderTextField} label="Ф.И.О." />
        </div>
        <div>
          <Field name="phone" component={renderTextField} label="Номер телефона" />
        </div>
        <div>
          <Field name="email" component={renderTextField} label="Почта" />
        </div>
        <div>
          Купить
          <Field
            name="isReserv"
            component={renderCheckbox}
          />
          Бронь
        </div>

        <RaisedButton
          label={`Оплатить ${this.calcPriceTicket()} грн.`}
          disableFocusRipple={true}
          primary={true}
          onClick={handleSubmit}
          style={{marginRight: 12}}
        />
      </form>
    );
  }

};

BuyStep.propTypes = {
  handleSubmit: PropTypes.func
};

const mapStateToProps = state => {
  return {
    basket: state.basket
  };
};

BuyStep = connect(mapStateToProps)(BuyStep);

export default reduxForm({
  form: 'stepper', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(BuyStep)