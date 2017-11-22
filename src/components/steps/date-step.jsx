import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { DatePicker } from 'redux-form-material-ui';

import validate from '../validate';
import { getEvents } from "../../services/api/events";
import { setEvents } from '../../actions/events';

import RaisedButton from 'material-ui/RaisedButton';

let DateTimeFormat = global.Intl.DateTimeFormat;

class DateStep extends Component {

  constructor(props) {
    super(props);

    this.changeDate = this.changeDate.bind(this);
  }

  changeDate(e, date) {
    /*
    * загрузка списка мероприятий
    */

    getEvents(date)
    .then(data => {
      if (data.error) {
        return console.error(data.msg);
      }
      this.props.dispatch(setEvents(data.events));
    })
    .catch(err => {
      console.log('err = ', err);
    });

  }

  render() {
    const { handleSubmit } = this.props;

    return (<div>
      <form onSubmit={handleSubmit} className={"first-page"}>
        <Field
          name="eventDate"
          component={DatePicker}
          format={(value, name) => value === '' ? null : value}
          DateTimeFormat={DateTimeFormat}
          hintText="Выберите дату"
          cancelLabel={'Отмена'}
          locale="ru-RU"
          onChange={this.changeDate}
          minDate={new Date()}
        />
        <RaisedButton
          label="Далее"
          disableFocusRipple={true}
          primary={true}
          onClick={handleSubmit}
          style={{ marginRight: 12 }}
        />
      </form>
    </div>)
  }
}

DateStep.propTypes = {
  handleSubmit: PropTypes.func
};


export default reduxForm({
  form: 'stepper', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(DateStep)