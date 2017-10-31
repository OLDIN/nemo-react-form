import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

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

    this.setState({
      selected: !this.state.selected
    });
  }

  render() {
    const { path, text, row } = this.props;
    const dataId = process.env.REACT_APP_ROW_FOR_PAY + row + text.number;

    const gClasses = classNames({
      'selected'       : this.state.selected,
      'reserved'       : this.state.reserved,
      'other-selected' : this.state.otherSelected,
      'sold'           : this.state.sold
    });

    return (
      <g data-id={dataId} seat={text.number} onClick={this.handleClick} className={gClasses}>
        <path className={path.className} d={path.d}></path>
        <text className={text.className} transform={text.transform} >{text.number}</text>
      </g>
    );
  }

}

Seat.propTypes = {
  path: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
  row: PropTypes.number.isRequired,
  eventId: PropTypes.number
};

// Decorate with connect to read form values
const selector = formValueSelector('stepper') // <-- same as form name

const mapStateToProps = state => {
  return {
    events: state.events,
    eventId: selector(state, 'time')
  };
}

export default connect(mapStateToProps)(Seat);