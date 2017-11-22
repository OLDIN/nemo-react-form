import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class FormPayment extends Component {

  render() {
    // const { data, signature } = this.props;
    const data = 'data';
    const signature = 'signature';

    return (
      <form method="POST" action="https://www.liqpay.ua/api/3/checkout" id="FormPayment" target="_top">
        <input type="hidden" name="data" value={data} />
        <input type="hidden" name="signature" value={signature} />
        <input type="submit" value="Перейдите по ссылке для оплаты" id="pay-submit"/>
      </form>
    );
  }

}

export default FormPayment;