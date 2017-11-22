export function getName({ isArena, isNightShow, name }) {
  if (!isArena) return name;
  if (isNightShow)
    return 'Романтическое ночное шоу';
  else
    return 'Дневное шоу';
}

export function isNextSeatInArena(basket, data, eventId) {
  const basketArena = basket.filter(s => s.isArena && s.row === data.row && s.id === eventId);

  if (!basketArena.length) return true;
  for (let seat of basketArena) {
    if (data.text.number === seat.seat - 1 || data.text.number === seat.seat + 1) return true;
  }

  return false;
}

export function isBetweenTwoSeats(basket, data, eventId, isBasketEvent = false) {
  const basketArena = basket.filter(s => s.isArena && s.row === data.row);
  let seatOnLeft, seatOnRight;

  if (!isBasketEvent) {
    seatOnLeft = basketArena.find(s => data.text.number - 1 === s.seat);
    seatOnRight = basketArena.find(s => data.text.number + 1 === s.seat);
  } else {
    seatOnLeft = basketArena.find(s => data.seat - 1 === s.seat);
    seatOnRight = basketArena.find(s => data.seat + 1 === s.seat);
  }

  if (seatOnLeft && seatOnRight) return true;

  return false;
}