import React, { Component } from 'react';
import Nav from './Nav';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav current="Search" />
      </div>
    );
  }
}

export default App;
