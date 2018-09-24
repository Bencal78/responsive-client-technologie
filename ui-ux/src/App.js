import React from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './Clock/Clock.js'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Clock date={new Date()}/>
      </div>
    );
  }
}

export default App;
