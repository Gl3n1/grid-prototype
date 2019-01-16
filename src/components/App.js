import React, { Component } from 'react';
import AppBar from './AppBar';
import Grid from './Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <Grid />
      </div>
    );
  }
}

export default App;