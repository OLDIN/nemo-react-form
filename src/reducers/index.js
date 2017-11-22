import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import events from './events';
import basket from './basket';
import seats from './seats';
import notif from './notif';

export default combineReducers({
  form: reduxFormReducer, // mounted under "form"
  events,
  basket,
  seats,
  notif
});