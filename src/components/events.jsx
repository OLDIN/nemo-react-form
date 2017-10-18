import React from 'react';
import {Grid, Cell} from 'material-grid/dist';

class Events extends React.Component {

  render(){
      return(
        <Grid>
          <Cell col={4} tablet={2} ><div className="box">4-2</div></Cell>
          <Cell col={8} tablet={6} ><div className="box">8-6</div></Cell>
        </Grid>
      );
  }
}

export default Events;