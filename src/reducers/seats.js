import {
  SET_SEATS,
  OTHER_SELECT,
  OTHER_UNSELECT,
  CLICK_SEAT,
  RESERV_SEAT,
  SOLD_SEAT,
  REMOVE_ALL_STATUS_SEATS
} from "../actions/seats";

const initialState = [];

export default function events (state = initialState, action) {
  switch (action.type) {

    case SET_SEATS:
      return action.seats;

    case CLICK_SEAT:
      return state.map(seat => {
        if (seat.data.id === action.dataId) {
          return Object.assign({}, seat, {
            selected: !seat.selected
          });
        }
        return seat;
      });

    case OTHER_SELECT:
      return state.map(seat => {
        if (seat.data.id === action.dataId) {
          return Object.assign({}, seat, {
            otherSelected: true,
            //socketId: action.socketId
          });
        }
        return seat;
      });

    case OTHER_UNSELECT:
      return state.map(seat => {
        if (seat.data.id === action.dataId) {
          return Object.assign({}, seat, {
            otherSelected: false,
            socketId: null
          });
        }
        return seat;
      });

    case RESERV_SEAT:
      return state.map(seat => {
        if (seat.data.id === +`${action.zone}${action.row}${action.place}`) {
          return Object.assign({}, seat, {
            reserved: true,
            selected: false,
            otherSelected: false
          });
        }
        return seat;
      });

    case SOLD_SEAT:
      return state.map(seat => {
        if (seat.data.id === +`${action.zone}${action.row}${action.place}`) {
          return Object.assign({}, seat, {
            reserved: false,
            selected: false,
            otherSelected: false,
            sold: true
          });
        }
        return seat;
      });

    case REMOVE_ALL_STATUS_SEATS:
      return state.map(seat => {
        return Object.assign({}, seat, {
          selected: false,
          otherSelected: false,
          sold: false,
          socketId: null,
          reserved: false
        });
      });

    default:
      return state;

  }
}
