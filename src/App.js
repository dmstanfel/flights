import React, { Component } from 'react';
import Page from './Page';
import './App.css';

class App extends Component { 

  render() {
    return <Page loggedIn={false} />;
  }
}

export default App;
