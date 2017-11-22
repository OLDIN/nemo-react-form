import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import validate from '../validate';

import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import BasketItem from './BasketItem';

class ListStep extends Component {

  render() {
    const { basket } = this.props;

    return (
      <div className={"select-step"}>
        <List>
          <Subheader>Выбранные мероприятия: </Subheader>
          {
            basket.map((event, i) =>
              <BasketItem key={i} event={event}/>
            )
          }
          <Divider inset={true} />
        </List>
      </div>
    );
  }

}

ListStep.propTypes = {
  basket: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    basket: state.basket
  };
}

ListStep = connect(mapStateToProps)(ListStep);

export default reduxForm({
  form: 'stepper', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ListStep)