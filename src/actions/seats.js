export const SET_SEATS = 'SET_SEATS';
export const OTHER_SELECT = 'OTHER_SELECT';
export const OTHER_UNSELECT = 'OTHER_UNSELECT';

export function setSeats(seats) {
  return { type: SET_SEATS, seats };
}

export function otherSelect(data) {
  return { type: OTHER_SELECT, ...data };
}

export function otherUnSelect(data) {
  return { type: OTHER_UNSELECT, ...data };
}