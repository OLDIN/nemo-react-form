import {
  PUSH_EVENT,
  REMOVE_EVENT,
  REMOVE_EVENTS
} from '../actions/basket';

const initialState = [];

export default function basket(state = initialState, action) {
  switch (action.type) {
    case PUSH_EVENT:
      return state.concat(action.event);
    case REMOVE_EVENT:
      return state.filter(e =>
        (!action.event.isArena && e.id !== action.event.id) ||
        (e.dataId !== action.event.dataId )
      );
    case REMOVE_EVENTS:
      return [];
    default:
      return state;
  }
}