import React from 'react';

const renderField = ({ input, label, type, meta: { touched, error } }) =>
  <section>
    <label>
      {label}
    </label>
      <input {...input} placeholder={label} type={type} />
      {touched &&
      error &&
      <span>
        {error}
      </span>}
  </section>;

export default renderField;