import React, { Component } from 'react';
import Page from './Page';
import './App.css';

// The base of the application div id='root' starts rendering from here.
class App extends Component { 

  // Page will serve as our template for stacking subsequent components
  render() {
    return <Page loggedIn={false} />;
  }
}

export default App;
