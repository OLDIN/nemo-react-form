export const SET_SEATS = 'SET_SEATS';
export const OTHER_SELECT = 'OTHER_SELECT';
export const OTHER_UNSELECT = 'OTHER_UNSELECT';
export const CLICK_SEAT = 'CLICK_SEAT';
export const RESERV_SEAT = 'RESERV_SEAT';
export const SOLD_SEAT = 'SOLD_SEAT';
export const REMOVE_ALL_STATUS_SEATS = 'REMOVE_ALL_STATUS_SEATS';

export function setSeats(seats) {
  return { type: SET_SEATS, seats };
}

export function otherSelect(data) {
  return { type: OTHER_SELECT, ...data };
}

export function otherUnSelect(data) {
  return { type: OTHER_UNSELECT, ...data };
}

export function clickSeat(data) {
  return { type: CLICK_SEAT, ...data };
}

export function reservSeat(data) {
  return { type: RESERV_SEAT, ...data };
}

export function soldSeat(data) {
  return { type: SOLD_SEAT, ...data };
}

export function removeAllStatusSeats() {
  return { type: REMOVE_ALL_STATUS_SEATS };
}