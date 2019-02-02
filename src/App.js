import React, { Component } from 'react';
import Activities from './Routes/ActivitiesPage';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Activities />
      </div>
    );
  }
}

export default App;
