import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { hideMsg } from '../../actions/notif';

import Snackbar from 'material-ui/Snackbar';

class Notif extends Component {

  handleActionTouchTap = () => {
    this.props.dispatch(hideMsg());
  };

  handleRequestClose = () => {
    this.props.dispatch(hideMsg());
  };

  render() {
    const { notif } = this.props;

    return (
      <Snackbar
        open={notif.show}
        message={notif.msg}
        className={`react-notif-${notif.msgType}`}
        action="Закрыть"
        autoHideDuration={4000}
        onActionTouchTap={this.handleActionTouchTap}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

Notif.propTypes = {
  notif: PropTypes.shape({
    msg: PropTypes.string,
    msgType: PropTypes.string,
    show: PropTypes.bool
  }).isRequired
};

const mapStateToProps = state => {
  return {
    notif: state.notif
  }
};

export default connect(mapStateToProps)(Notif);