import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { find } from 'lodash';

import {
  pushEvent,
  removeEvent
} from '../../actions/basket';

import { clickSeat } from '../../actions/seats';
import { addMsg } from '../../actions/notif';
import {
  isBetweenTwoSeats,
  isNextSeatInArena
} from '../../services/helpers';

class Seat extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(e) {
    const { data } = this.props;
    // если какое-то из действий было выполнено с местом, то закрываем доступ к выделению
    if (data.reserved || data.otherSelected || data.sold) {
      return this.props.dispatch(addMsg({ msg: "Место недоступно для покупки", msgType: 'error' }));
    }

    if (!this.props.eventId) {
      return this.props.dispatch(addMsg({ msg: "Вы должны выбрать время мероприятия", msgType: 'error' }));
    }

    const { eventId, events, basket } = this.props;

    if (this.inBasket({ id: eventId, dataId: data.data.id })) {
      // проверяем рядом ли это место с предыдущим выбранным
      if (isBetweenTwoSeats(basket, data)) {
        return this.props.dispatch(addMsg({ msg: 'Вы не можете отменить место между двумя купленными.', msgType: 'error' }));
      }
      // удаляем из корзины
      this.props.dispatch(removeEvent({
        id: eventId,
        dataId: data.data.id
      }));
      // выставляем месту статус "выбран"
      this.props.dispatch(clickSeat({
        dataId: data.data.id
      }));

    } else {

      const event = find(events, { id: eventId });

      if (!event) {
        return this.props.dispatch(addMsg({ msg: 'Мероприятие не было найден. Что-то пошло не так.', msgType: 'error' }));
      }
      // проверяем рядом лми это место с предыдущим выбранным
      if (!isNextSeatInArena(basket, data, eventId)) {
        return this.props.dispatch(addMsg({ msg: 'Вы должны выбрать соседнее место', msgType: 'error' }));
      }
      // заносим в массив "корзина"
      this.props.dispatch(pushEvent({
        id: eventId,
        row: data.row,
        seat: data.text.number,
        dataId: data.data.id,
        dateStart: event.date_start,
        isArena: event.events_global.gevent_group.isArena,
        isNightShow: event.events_global.isNightShow,
        name: event.events_global.name,
        price: event.price,
        icon: event.events_global.onlinePaymentIcon
      }));
      // выставляем месту статус "выбран"
      this.props.dispatch(clickSeat({
        dataId: data.data.id
      }));

    }

  }

  inBasket(event) {
    const { basket } = this.props;

    const foundEvent = basket.filter(e =>
      e.id === event.id && e.dataId === event.dataId
    ).length;

    return foundEvent ? true : false;
  }

  render() {
    const { data, key } = this.props;

    const inBasket = this.inBasket({ id: this.props.eventId, dataId: data.data.id });

    const gClasses = classNames({
      'selected'       : data.selected || inBasket,
      'reserved'       : data.reserved,
      'other-selected' : data.otherSelected,
      'sold'           : data.sold
    });

    return (
      <g onClick={this.handleClick} className={gClasses} key={key}>
        <path className={data.path.className} d={data.path.d}></path>
        <text className={data.text.className} transform={data.text.transform} >{data.text.number}</text>
      </g>
    );
  }

}

Seat.propTypes = {
  data: PropTypes.object.isRequired,
  eventId: PropTypes.number,
  events: PropTypes.array.isRequired,
  basket: PropTypes.array.isRequired
};

// Decorate with connect to read form values
const selector = formValueSelector('stepper') // <-- same as form name

const mapStateToProps = state => {
  return {
    events: state.events,
    basket: state.basket,
    eventId: selector(state, 'time')
  };
}

export default connect(mapStateToProps)(Seat);