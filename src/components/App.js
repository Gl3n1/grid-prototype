import React, { Component } from 'react';
import AppBar from './AppBar';
import BasicLayout from './Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <BasicLayout />
      </div>
    );
  }
}

export default App;