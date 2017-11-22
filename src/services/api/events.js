import moment from 'moment';
import axios from 'axios';

import {
  reservSeat,
  soldSeat,
  removeAllStatusSeats
} from '../../actions/seats';

export const getEvents = date => {
  return axios.get(`${process.env.REACT_APP_API_LINK}/events`, {
    params: {
      date: moment(date).format('YYYY-MM-DD')
    }
  })
  .then(res => res.data);
}

export const getArenaEvents = (dispatch, eventId) => {
  return axios.get(`${process.env.REACT_APP_API_LINK}/events/${eventId}`)
  .then(res => res.data)
  .then(data => {
    if (data.error) {
      //FIXME: заменить это на нормальный notif
      return console.log(data.msg);
    }
    // убираем всю подсветку с мест
    dispatch(removeAllStatusSeats());
    // выставляем новую подсветку мест
    data.ticketEvents.forEach(seat => {

      if (seat.reserved) {

        dispatch(reservSeat({
          zone: seat.zone,
          row: seat.row,
          place: seat.place
        }));

      } else {

        dispatch(soldSeat({
          zone: seat.zone,
          row: seat.row,
          place: seat.place
        }));

      }

    });
    console.log('arenaEvents = ', data.arenaEvents);
  });
};

