import React from 'react';
import Clock from './Clock/Clock.js'
import Chat from './Chat/Chat.js'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { listClock: [], chat: [] };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  //All methods related to Clock
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

  //All methods related to Chat
  handleSend(name, text) {
    this.setState({
      chat: this.state.chat.concat(`${name}: ${text}`)
    });
  }

  render() {
    return (
      <div className="App">
        <div className="Clock">
          {this.displayClocks()}

          <button onClick={this.add}>New</button>
          <button onClick={this.remove}>Delete</button>
        </div>
        <div className="Chat">
          <Chat onSend={this.handleSend} name="Chat1" display={this.state.chat}/>
          <Chat onSend={this.handleSend} name="Chat2" display={this.state.chat}/>
        </div>
      </div>
    );
  }
}

export default App;
