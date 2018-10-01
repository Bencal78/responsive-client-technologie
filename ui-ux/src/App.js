import React from 'react';
import Clock from './Clock/Clock.js'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { listClock: [] };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  start(index){
    let clocks = this.state.listClock.slice();
    clocks[index].run = true;
    this.setState({ listClock: clocks});
  }

  stop(index){
    let clocks = this.state.listClock.slice();
    clocks[index].run = false;
    this.setState({ listClock: clocks});
  }

  add() {
    this.setState({
      listClock: this.state.listClock.concat({ date: new Date(), run: true })
    });
  }

  remove() {
    this.setState({
      listClock: this.state.listClock.slice(0, -1)
    });
  }

  displayClocks() {
    let listItem = this.state.listClock.map((clock, index) =>
        <li key={index}>
          <Clock date={clock.date} run={clock.run}/>
          <button onClick={() => {this.start(index)}}>Start</button>
          <button onClick={() => {this.stop(index)}}>Stop</button>
        </li>
    );

    return (<ul>{listItem}</ul>);
  }

  render() {
    return (
      <div className="App">
        {this.displayClocks()}

        <button onClick={this.add}>New</button>
        <button onClick={this.remove}>Delete</button>
      </div>
    );
  }
}

export default App;
