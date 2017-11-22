import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import moment from 'moment';

import {darkBlack, red500} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import { removeEvent } from '../../actions/basket';

import {
  getName,
  isBetweenTwoSeats
} from '../../services/helpers';

import { addMsg } from '../../actions/notif';
// Icons images
import IconDay from '../icons/day.svg';
import IconAquarium from '../icons/aquarium.svg';
import IconNight from '../icons/night.svg';
import IconSwimming from '../icons/swimming.svg';

const icons = {
  IconDay,
  IconAquarium,
  IconNight,
  IconSwimming
};

class BasketItem extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { event, basket } = this.props;

    const eventInfo = {
      id: event.id,
      isArena: event.isArena
    };

    if (event.isArena) {
      if (isBetweenTwoSeats(basket, event, event.id, true)) {
        return this.props.dispatch(addMsg({ msg: 'Вы не можете отменить место между двумя купленными.', msgType: 'error' }));
      }
      eventInfo.dataId = event.dataId;
    }

    this.props.dispatch(removeEvent(eventInfo));
  }

  render() {
    const { event } = this.props;
    const deleteIcon = (
      <FontIcon className="material-icons" color={red500} onClick={this.handleClick}>remove_circle</FontIcon>
    );

    const name = getName({
      isArena: event.isArena,
      isNightShow: event.isNightShow,
      name: event.name
    });

    return (
      <ListItem
        leftAvatar={<Avatar className={"avatar-bg"} src={icons[event.icon]} />}
        rightIcon={deleteIcon}
        primaryText={name}
        secondaryText={
          <p>
            Дата:  <span style={{color: darkBlack}}>{moment(event.dateStart).format('DD.MM.YYYY')}, </span>
            { event.isArena
              ? <span>Время: <span style={{color: darkBlack}}>{moment(event.dateStart).format('HH:mm')} </span><br /></span>
              : ''
            }
            { event.isArena
              ? <span>
                  Ряд:    <span style={{color: darkBlack}}>{event.row}</span>,
                  Место: <span style={{color: darkBlack}}>{event.seat}</span>,
                </span>
              : ''
            }
            <span>Цена: <span style={{color: darkBlack}}>{event.price} грн.</span> </span>
          </p>
        }
        secondaryTextLines={2}
      />
    );
  }
}

BasketItem.propTypes = {
  event: PropTypes.object.isRequired,
  basket: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    basket: state.basket
  };
}

export default connect(mapStateToProps)(BasketItem);