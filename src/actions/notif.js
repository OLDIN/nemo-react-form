export const ADD_MSG = 'ADD_MSG';
export const HIDE_MSG = 'HIDE_MSG';

export function addMsg(data) {
  return { type: ADD_MSG, show: true, ...data };
}

export function hideMsg() {
  return { type: HIDE_MSG };
}