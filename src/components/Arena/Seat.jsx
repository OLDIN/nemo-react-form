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

// import Notif from '../Notif';

class Seat extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      selected: false,
      reserved: false,
      otherSelected: false,
      sold: false
    }
  }

  handleClick(e) {
    const { reserved, otherSelected, sold } = this.state;
    // если какое-то из действий было выполнено с местом, то закрываем доступ к выделению
    if (reserved || otherSelected || sold) {
      return console.log("Место недоступно для покупки");
    }

    if (!this.props.eventId) {
      return console.log("Вы должны выбрать время мероприятияпочему ");
    }

    const { eventId, row, text, events } = this.props;

    this.setState({
      selected: !this.state.selected
    });

    if (this.inBasket({ id: eventId, row, seat: text.number })) {

      this.props.dispatch(removeEvent({
        id: eventId,
        row,
        seat: text.number
      }));

    } else {

      const event = find(events, { id: eventId });

      if (!event) {
        return console.log('Мероприятие не было найден. Что-то пошло не так.');
      }

      this.props.dispatch(pushEvent({
        id: eventId,
        row,
        seat: text.number,
        dateStart: event.date_start,
        isArena: event.events_global.gevent_group.isArena,
        isNightShow: event.events_global.isNightShow,
        name: event.events_global.name,
        price: event.price,
        icon: event.events_global.onlinePaymentIcon
      }));

    }

  }

  inBasket(event) {
    const { basket } = this.props;

    const foundEvent = basket.filter(e =>
      e.id === event.id && e.row === event.row && e.seat === event.seat
    ).length;

    return foundEvent ? true : false;
  }

  render() {
    const { data } = this.props;

    const gClasses = classNames({
      'selected'       : this.state.selected,
      'reserved'       : this.state.reserved,
      'other-selected' : data.otherSelected,
      'sold'           : this.state.sold
    });

    return (
      <g onClick={this.handleClick} className={gClasses}>
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