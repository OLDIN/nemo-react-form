import {
  SET_SEATS,
  OTHER_SELECT,
  OTHER_UNSELECT
} from "../actions/seats";

const initialState = [];

export default function events (state = initialState, action) {
  switch (action.type) {

    case SET_SEATS:
      return action.seats;

    case OTHER_SELECT:
      return state.map(seat => {
        if (seat.data.id === action.dataId) {
          seat.otherSelected = true;
          seat.socketId = action.socketId;
        }
        return seat;
      });

    case OTHER_UNSELECT:
      return state.map(seat => {
        if (seat.data.id === action.dataId) {
          seat.otherSelected = false;
          delete seat.socketId
        }
        return seat;
      });

    default:
      return state;

  }
}
