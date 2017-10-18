import React from 'react';
import PropTypes from 'prop-types';

import { reduxForm } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {Grid, Cell} from 'material-grid/dist';
import validate from '../validate';


// Icons images
import IconDiving from '../icons/diving.svg';
import IconDay from '../icons/day.svg';
import IconAquarium from '../icons/aquarium.svg';
import IconNight from '../icons/night.svg';
import IconSwimming from '../icons/swimming.svg';

const EventStep = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Cell col={4} tablet={4} phone={2}>
          <div className="item-icons">
            <img src={IconNight} alt="IconDay"/>
            <p>Романтическое ночное шоу</p>
          </div>
        </Cell>
        <Cell col={4} tablet={4} phone={2}>
          <div className="item-icons">
            <img src={IconDay} alt="IconDay"/>
            <p>Дневное шоу</p>
          </div>
        </Cell>
        <Cell col={4} tablet={4} phone={2}>
          <div className="item-icons">
            <img src={IconSwimming} alt="IconDay"/>
            <p>Купание с дельфинами</p>
          </div>
        </Cell>
        <Cell col={4} tablet={4} phone={2}>
          <div className="item-icons">
            <img src={IconDay} alt="IconDay"/>
            <p>Фото с дельфинами в воде</p>
          </div>
        </Cell>
        <Cell col={4} tablet={4} phone={2}>
          <div className="item-icons">
            <img src={IconAquarium} alt="Океанариум"/>
            <p>Океанариум</p>
          </div>
        </Cell>
        <Cell col={4} tablet={4} phone={2}>
          <div className="item-icons">
            <img src={IconDiving} alt="Дайвинг"/>
            <p>Дайвинг</p>
          </div>
        </Cell>
      </Grid>
      <RaisedButton
        label="Далее"
        disableFocusRipple={true}
        primary={true}
        onClick={props.handleSubmit}
        style={{marginRight: 12}}
      />
      <FlatButton
        label="Назад"
        onClick={props.handlePrev}
      />

    </form>
  )
};

EventStep.propTypes = {
  handleSubmit: PropTypes.func,
  handlePrev: PropTypes.func
};

export default reduxForm({
  form: 'stepper', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(EventStep)