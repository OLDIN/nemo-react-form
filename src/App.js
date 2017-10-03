import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import logo from './logo.svg';
import 'material-grid/dist/css/material-grid.css';
import './App.css';
import StepperComp from "./steperComp";
import Preloader from './components/preloader';



class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 800);
  }




render() {
    const { loading } = this.state;

    if(loading) {
      return (
        <Preloader />
      );
    }
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Дельфинарий "Немо", покупка и бронирование билетов</h1>
          </header>
          <br/>
          <StepperComp />
        </div>
      </MuiThemeProvider>
    );
  }
}



export default App;