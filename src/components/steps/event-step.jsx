import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { reduxForm } from 'redux-form';

import { connect } from 'react-redux';
import classNames from 'classnames';

import { find } from 'lodash';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import { Grid, Cell } from 'material-grid/dist';
import validate from '../validate';

import { getName } from '../../services/helpers';
// Icons images
import IconDiving from '../icons/diving.svg';
import IconDay from '../icons/day.svg';
import IconAquarium from '../icons/aquarium.svg';
import IconNight from '../icons/night.svg';
import IconSwimming from '../icons/swimming.svg';

import { selectEvent } from '../../actions/events';

const icons = {
  IconDiving,
  IconDay,
  IconAquarium,
  IconNight,
  IconSwimming
};

class EventStep extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.dispatch(selectEvent(e.currentTarget.dataset.id));
  }

  getUniqueEvents(events) {
    return events.reduce((prev, cur) => {

      if (!cur.events_global.gevent_group.isArena) {
        prev.push(cur);
        return prev;
      }

      const event = find(prev, e => e.events_global.isNightShow === cur.events_global.isNightShow);

      if (!event) {
        prev.push(cur);
        return prev;
      }

      return prev;

    }, []);
  }

  render() {
    const { handleSubmit, handlePrev, events } = this.props;
    const filteredEvents = this.getUniqueEvents(events);

    return (
      <form onSubmit={handleSubmit}>
        <Grid>
          {
            filteredEvents.map((e, i) => {
              const name = getName({
                isArena: e.events_global.gevent_group.isArena,
                isNightShow: e.events_global.isNightShow,
                name: e.events_global.name
              });

              const cellClasses = classNames({
                'item-icons': true,
                selected: e.selected
              });

              return (
                <Cell
                  col={4}
                  tablet={4}
                  phone={2}
                  key={i}
                  isArena={e.events_global.gevent_group.isArena}
                  isNightShow={e.events_global.isNightShow}
                  id={e.id}
                >
                  <div className={cellClasses} onClick={this.handleClick} data-id={e.id}>
                    <img src={icons[e.events_global.onlinePaymentIcon]} alt={name}/>
                    <p>{name} - {e.price} грн.</p>
                  </div>
                </Cell>
              )
            })
          }
        </Grid>
        <RaisedButton
          label="Далее"
          disableFocusRipple={true}
          primary={true}
          onClick={handleSubmit}
          style={{ marginRight: 12 }}
        />
        <FlatButton
          label="Назад"
          onClick={handlePrev}
        />

      </form>
    )
  }

}

EventStep.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handlePrev: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    events: state.events
  };
}

EventStep = connect(mapStateToProps)(EventStep);

export default reduxForm({
  form: 'stepper', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(EventStep)