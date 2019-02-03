import React, { Component } from 'react';
import Activities from './Routes/ActivitiesPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Activities />
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

export default App;
