import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'material-grid/dist/css/material-grid.css';
import './App.css';

import Steppers from "./steppers";

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});

const store = (
  window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);


const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {
      // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
      resolve()
    }, 500);
  });

class App extends Component {

render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Steppers onSubmit={showResults}/>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;