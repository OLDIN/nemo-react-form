"use strict";

import React from 'react';
import { DatePicker } from 'redux-form-material-ui';

let DateTimeFormat = global.Intl.DateTimeFormat;

class DatePickerComp extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      controlledDate: null,
    };
  }

  handleChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
  };

  render() {
    return (
      <DatePicker
        value={this.state.controlledDate}
        onChange={this.handleChange}
        hintText="Дата события"
        DateTimeFormat={DateTimeFormat}
        mode="landscape"
        locale="ru-RU"
        cancelLabel={'Отмена'}
      />
    );
  }
}

export default DatePickerComp;