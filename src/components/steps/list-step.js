import React from 'react';
import PropTypes from 'prop-types';

import { reduxForm } from 'redux-form';


import validate from '../validate';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import {darkBlack, red500} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';

// Icons images
import IconDay from '../icons/day.svg';
// import IconAquarium from '../icons/aquarium.svg';
// import IconNight from '../icons/night.svg';
// import IconSwimming from '../icons/swimming.svg';



const deleteIcon = (
  <FontIcon className="material-icons" color={red500}>remove_circle</FontIcon>
);

const ListStep = props => {
  // const { handleSubmit } = props;

  return (
    <div className={"select-step"}>
        <List>
          <Subheader>Выбранные мероприятия: </Subheader>
          <ListItem
            leftAvatar={<Avatar className={"avatar-bg"} src={IconDay} />}
            rightIcon={deleteIcon}
            primaryText="Дневное шоу"
            secondaryText={
              <p>
                Дата:  <span style={{color: darkBlack}}>14.10.2017, </span>
                Время: <span style={{color: darkBlack}}>15:00 </span><br />
                Ряд:    <span style={{color: darkBlack}}>1</span>,
                Место: <span style={{color: darkBlack}}>10</span>
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider inset={true} />
        </List>
    </div>
  )
};

ListStep.propTypes = {
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'stepper', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ListStep)