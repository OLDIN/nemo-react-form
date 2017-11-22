import {
  ADD_MSG,
  HIDE_MSG
} from "../actions/notif";

const initialState = {
  show: false,
  type: '',
  msg: ''
};

export default function events (state = initialState, action) {
  switch (action.type) {

    case ADD_MSG:
      return { msg: action.msg, msgType: action.msgType, show: action.show };

    case HIDE_MSG:
      return { msg: '', msgType: '', show: false };

    default:
      return state;
  }
}
