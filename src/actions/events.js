export const SET_EVENTS = 'SET_EVENTS';
export const SELECT_EVENT = 'SELECT_EVENT';

export function setEvents(events) {
  return { type: SET_EVENTS, events };
}

export function selectEvent(id) {
  return { type: SELECT_EVENT, id };
}