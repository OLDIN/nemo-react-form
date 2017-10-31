import events from './events';
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  form: reduxFormReducer, // mounted under "form"
  events
});