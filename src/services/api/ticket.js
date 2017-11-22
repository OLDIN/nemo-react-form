import axios from 'axios';

export function createTicket(values, basket) {
  /*
  * отправка запроса на создание билета
  */
  return new Promise((resolve, reject) => {

    if (typeof values.isReserv === 'undefined') {
      values.isReserv = false;
    }

    return axios.post(`${process.env.REACT_APP_API_LINK}/ticket/create-reserv`, {
      phone: values.phone,
      note: values.fullName,
      email: values.email,
      events: basket,
      isReserv: values.isReserv
    })
    .then(res => res.data)
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    })

  });

}