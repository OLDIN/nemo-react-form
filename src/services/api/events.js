import moment from 'moment';
import axios from 'axios';

const getEvents = date => {
  return axios.get(`${process.env.REACT_APP_API_LINK}/events`, {
    params: {
      date: moment(date).format('YYYY-MM-DD')
    }
  })
  .then(res => res.data);
}

export {
  getEvents
};