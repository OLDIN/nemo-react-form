import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';

class Notif extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: this.props.show || false
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true
    });
  };

  handleActionTouchTap = () => {
    this.setState({
      open: false
    });
    alert('Event removed from your calendar.');
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { msg, duration } = this.props;
    return (
      <Snackbar
        open={this.state.open}
        message={msg}
        action="undo"
        autoHideDuration={duration}
        onActionTouchTap={this.handleActionTouchTap}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

Notif.propTypes = {
  msg: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  show: PropTypes.bool
};

export default Notif;