import React from 'react';
import DatePicker from 'material-ui/DatePicker';

let DateTimeFormat = global.Intl.DateTimeFormat;

const DatePickerComp = () => (
    <DatePicker
      hintText="Дата события"
      DateTimeFormat={DateTimeFormat}
      mode="landscape"
      locale="ru-RU"
      cancelLabel={'Отмена'}
    />
);

export default DatePickerComp;