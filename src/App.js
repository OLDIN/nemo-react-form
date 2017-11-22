import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'material-grid/dist/css/material-grid.css';

import './App.css';
import Logo from './img/top-logo-hotel.svg';

import MDSteppers from './mdsteppers';
import configureStore from './configureStore.dev';

import Notif from './components/Notif';

import Sockets from './services/sockets';

const initialState = window.REDUX_INITIAL_STATE || {};

const store = configureStore(initialState);

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {
      // simulate server latency
      console.log(`You submitted: `, values);
      resolve();
    }, 500);
  });

class App extends Component {

  constructor(props) {
    super(props);
    // стартуем соккеты
    const sockets = new Sockets(store);
    this.sockets = sockets.getSockets();
  }

  getChildContext() {
    return {
      sockets: this.sockets
    };
  }

  render() {
      return (
        <Provider store={store}>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <main>
                <header className={"wrapper-header"}>
                  <img src={Logo} alt="покупка и бронирование билетов"/>
                  <h1>Покупка и бронирование билетов</h1>
                </header>
              <section className={"content"}>
                <MDSteppers onSubmit={showResults} />
                <Notif />
              </section>
            </main>
          </MuiThemeProvider>
        </Provider>
      );
    }
}

App.childContextTypes = {
  sockets: PropTypes.object
};

export default App;