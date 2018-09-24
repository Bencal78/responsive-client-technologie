import React from 'react';
import Clock from './Clock/Clock.js'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Clock date={new Date()}/>
      </div>
    );
  }
}

export default App;
