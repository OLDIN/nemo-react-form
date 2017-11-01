export const PUSH_EVENT = 'PUSH_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';

export function pushEvent(event) {
  return { type: PUSH_EVENT, event };
}

export function removeEvent(event) {
  return { type: REMOVE_EVENT, event };
}