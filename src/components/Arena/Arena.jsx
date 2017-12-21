import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { chain, zipObject } from 'lodash';

import seatsList from './seats.json';
import Seat from './Seat';

import { setSeats } from '../../actions/seats';
import { getArenaEvents } from '../../services/api/events';

class Arena extends Component {

  constructor(props) {
    super(props);

    this.props.dispatch(setSeats(seatsList));
  }

  componentDidMount() {
    const eventId = this.props.eventId;
    const { sockets } = this.context;

    if (!eventId) return;

    // подгрузка списка занятых мест
    getArenaEvents(this.props.dispatch, eventId)
    .then(() => {
      // запрос на получение выбранных мест другими кассирами
      sockets.nemo.emit('cashier', { event: 'get-places' });
      sockets.api.emit('online-pay', { event: 'get-places' });
    })
  }

  render(){
    const { seats } = this.props;

    const rows = chain(seats)
      .groupBy("row")
      .toPairs()
      .map(item => zipObject(["row", "seats"], item))
      .value();

    return(
      <section className={"seats-wrapper"}>
        <svg version="1.1" className={"arena_svg"} xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
             viewBox="0 0 1405.8 776.7"  >

          <path className="st0" d="M1364,34.4v499.8l-509.5,0.8c-317.3,0-608.2-222.5-608.2-500.7C647.8,34.4,1364,34.4,1364,34.4z"/>
          <path className="st1" d="M1364,455.9c0,0-340.8,0.2-511.5,0.2C542.9,414.7,328.7,215.5,328.7,34.4C506.6,33.7,1364,34.4,1364,34.4V455.9
        z"/>
          <path className="st2" d="M338,354.6c-48.1-52.9-86.2-114.5-108.7-183.2c-11.5-35.2-18.6-71.7-21-108.6L49,62.7
        c2.6,53.6,12.5,107.1,29.2,158.1c25.8,78.9,66.9,150.7,118.9,213.9L338,354.6z"/>
          <path className="st3" d="M196.6,264.7c0.7,0.2,1.4,0.4,2,0.8c1.4,0.7,2.7,1.9,3.7,3.5c0.7,1,2.1,3.6,4.2,7.6l5.6,10.8l-15.6,8.1v-8.2
        l6.9-3.6l-3.1-6c-1.2-2.3-2-3.7-2.5-4.3c-0.4-0.5-0.8-0.9-1.3-1.2v-7.5L196.6,264.7L196.6,264.7z M196.6,260.1v-3l1.5,3.2
        L196.6,260.1z M183.5,274.9c0.4,0.2,0.7,0.5,1.1,0.7c-0.4-2.2-0.2-4.2,0.6-6c0.8-1.7,2.2-3.1,4-4c1.5-0.8,3-1.1,4.7-1.2
        c0.9,0,1.8,0.1,2.7,0.3v7.6c-0.4-0.2-0.7-0.4-1.1-0.5c-1-0.2-2-0.1-3.2,0.5c-1,0.5-1.7,1.1-2.1,2c-0.4,0.8-0.6,1.7-0.4,2.8
        c0.1,1,1,3,2.5,5.9l2.7,5.2l1.6-0.9v8.2l-13.1,6.8v-8.2l6.2-3.2l-2.2-4.2c-1.3-2.5-2.1-4-2.5-4.6s-0.9-1.2-1.5-1.5V274.9
        L183.5,274.9z M196.6,257.2v3l-13.1-2v-7.3l10.9,1.7L196.6,257.2L196.6,257.2z M183.5,244.9v-13.7l0.7-1.1l3.6,7.9L183.5,244.9z
         M180.4,303.9l-6.6-12.7c-1.3-2.5-2.2-4.5-2.6-5.8c-0.4-1.4-0.6-2.7-0.4-4c0.2-1.3,0.6-2.6,1.4-3.8c0.8-1.2,1.8-2.2,3.2-2.9
        c1.5-0.8,3.1-1.1,4.7-0.9c1.2,0.1,2.4,0.5,3.4,1.1v5.8c-0.3-0.2-0.7-0.4-1-0.5c-1-0.3-1.9-0.2-3,0.3c-1,0.5-1.6,1.2-2,2.1
        c-0.3,0.9-0.3,1.9,0.1,3c0.3,0.7,1.2,2.5,2.7,5.5l1.9,3.7l1.2-0.6v8.2L180.4,303.9L180.4,303.9z M183.5,231.2v13.6l-3.4,5.4l3.4,0.5
        v7.3l-7.6-1.2l-10.1,16v-13.3l2.4-3.8l-2.4-0.4v-7.2l6.5,1L183.5,231.2L183.5,231.2z M165.9,235.8c0.4-0.1,0.8-0.3,1.3-0.4
        c5.4-2,9-5,11-9.1s2-8.6,0.2-13.6c-1.8-4.9-4.8-8.3-9-10.1c-1.1-0.5-2.3-0.8-3.5-1v7.4c0.4,0.1,0.8,0.2,1.2,0.4
        c2.6,1,4.4,2.9,5.4,5.6c1,2.7,0.8,5.3-0.5,7.8c-1.1,2.1-3.2,3.9-6.1,5.2L165.9,235.8L165.9,235.8z M165.9,197.2v-19.3l3.6,12
        l7.5-2.2l1.7,5.8L165.9,197.2L165.9,197.2z M165.9,167.4v-6.3l2.9-0.9l1.7,5.8L165.9,167.4z M165.9,161.1v6.3l-2.9,0.9l2.9,9.6v19.3
        l-0.5,0.1l-0.9-2.9c-3.4-0.5-7-0.5-11,0.2c-1.4,0.2-2.8,0.5-4.4,0.9v-7.1c5.5-1.1,9.9-1.6,13.3-1.2l-3.9-13l-9.4,2.8v-7.6l7.3-2.2
        l-0.9-3L165.9,161.1L165.9,161.1z M165.9,201.5v7.4c-2.4-0.5-5.2-0.2-8.5,1c-3.9,1.4-6.4,3.3-7.7,5.7c-0.3,0.5-0.5,1-0.6,1.5v-11.2
        c1.7-1.2,3.6-2.2,5.9-3C159,201.4,162.6,201,165.9,201.5L165.9,201.5z M165.9,227.9v8c-2.9,0.9-5.6,1.4-7.9,1.2
        c-2-0.1-3.9-0.6-5.8-1.4c-1.2-0.5-2.2-1.1-3.1-1.8v-11.2c0.1,0.3,0.2,0.5,0.3,0.8c1,2.8,2.8,4.7,5.4,5.7c2.6,1,5.8,0.8,9.6-0.6
        C164.9,228.3,165.4,228.1,165.9,227.9L165.9,227.9z M165.9,248.1v7.2l-10.2-1.6l-3.5-7.7L165.9,248.1L165.9,248.1z M165.9,259.5
        v13.3l-0.9,1.4l-3.5-7.7L165.9,259.5z M149.1,169.4v7.6l-13.3,4l3,10.1c3.8-1.1,7.2-2,10.3-2.7v7.1c-3.1,0.7-6.6,1.6-10.5,2.8
        l-3.6,1.1l-7.1-23.7L149.1,169.4L149.1,169.4z M149.1,205.9v11.2c-0.6,1.7-0.6,3.6,0,5.5v11.2c-0.5-0.4-1.1-0.9-1.5-1.4
        c-1.7-1.8-3-4-4-6.8c-1.8-5-1.7-9.5,0.2-13.6C144.9,209.6,146.7,207.6,149.1,205.9z"/>
          <g>
            {
              rows.map((row, rowI) => <g key={rowI}>
                {
                  row.seats.map((seat, seatI) => <Seat data={seat} key={seatI}/>)
                }
              </g>)
            }
          </g>
        </svg>
      </section>
    );
  }

}

Arena.propTypes = {
  seats: PropTypes.array.isRequired,
  eventId: PropTypes.number
};

Arena.contextTypes = {
  sockets: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log('state = ', state);
  return {
    seats: state.seats,
    eventId: state.form.stepper.values.time
  };
}

export default connect(mapStateToProps)(Arena);
