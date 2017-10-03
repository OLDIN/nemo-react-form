import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';


const Preloader = () => (
  <MuiThemeProvider>
    <div className={"preloader"}>
      <CircularProgress size={80} thickness={5} />
    </div>
  </MuiThemeProvider>
);

export default Preloader;