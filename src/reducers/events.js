import {
  SET_EVENTS,
  SELECT_EVENT
} from "../actions/events";

const initialState = [];

export default function events (state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return action.events;
    case SELECT_EVENT:
      return state.map(e => {
        return { ...e, selected: e.id === +action.id }
      })
    default:
      return state;
  }
}
