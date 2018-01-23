import axios from 'axios';
import { searchToObject } from '../helpers';

export function createTicket(values, basket) {
  /*
  * отправка запроса на создание билета
  */
  return new Promise((resolve, reject) => {

    if (typeof values.isReserv === 'undefined') {
      values.isReserv = false;
    }

    const query = searchToObject();

    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_LINK}/ticket/create-reserv`,
      data: {
        phone: values.phone,
        note: values.fullName,
        email: values.email,
        events: basket,
        isReserv: values.isReserv
      },
      params: query
    })
    .then(res => res.data)
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      if (err.response.data) {
        if (err.response.data.msg) {
          return reject((err.response.data.msg).toString());
        }
      }
      reject(err);
    })

  });

}