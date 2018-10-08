// import React from 'react';
// import Clock from './Clock/Clock.js'
// import Chat from './Chat/Chat.js'
//
// class App extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = { listClock: [], chat: [] };
//   }
//
//   //All methods related to Clock
//   start(index){
//     let clocks = this.state.listClock.slice();
//     clocks[index].run = true;
//     this.setState({ listClock: clocks});
//   }
//
//   stop(index){
//     let clocks = this.state.listClock.slice();
//     clocks[index].run = false;
//     this.setState({ listClock: clocks});
//   }
//
//   add() {
//     this.setState({
//       listClock: this.state.listClock.concat({ date: new Date(), run: true })
//     });
//   }
//
//   remove() {
//     this.setState({
//       listClock: this.state.listClock.slice(0, -1)
//     });
//   }
//
//   displayClocks() {
//     let listItem = this.state.listClock.map((clock, index) =>
//         <li key={index}>
//           <Clock date={clock.date} run={clock.run}/>
//           <button onClick={() => {this.start(index)}}>Start</button>
//           <button onClick={() => {this.stop(index)}}>Stop</button>
//         </li>
//     );
//
//     return (<ul>{listItem}</ul>);
//   }
//
//   //All methods related to Chat
//   handleSend(name, text) {
//     this.setState({
//       chat: this.state.chat.concat(`${name}: ${text}`)
//     });
//   }
//
//   render() {
//     const { chat } = this.state;
//     return (
//       <div className="App">
//         <div className="Clock">
//           {this.displayClocks()}
//
//           <button onClick={() => this.add()}>New</button>
//           <button onClick={() => this.remove()}>Delete</button>
//         </div>
//         <div className="Chat">
//           <Chat onSend={(name, text) => this.handleSend(name, text) } name="Chat1" display={chat}/>
//           <Chat onSend={(name, text) => this.handleSend(name, text) } name="Chat2" display={chat}/>
//         </div>
//       </div>
//     );
//   }
// }
//
// export default App;

import { BrowserRouter, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Clock from './Clock/Clock.js';
import Chat from './Chat/Chat.js';

class App extends Component {
    constructor(props){
      super(props);
      this.state = { listClock: [], chat: [] };
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
     const { chat } = this.state;
      return (
        <div className="App">
          <BrowserRouter>
            <div>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/clock">Clock</Link></li>
              </ul>
              <Route exact path="/" component={(name, text) =>
                <div className="Chat">
                  <Chat onSend={(name, text) => this.handleSend(name, text) } name="Chat1" display={chat}/>
                  <Chat onSend={(name, text) => this.handleSend(name, text) } name="Chat2" display={chat}/>
                </div>
              }/>
              <Route path="/clock" component={() =>
                <div className="Clock">
                  {this.displayClocks()}
                  <button onClick={() => this.add()}>New</button>
                  <button onClick={() => this.remove()}>Delete</button>
                </div>
                // <Clock​ date={new Date()} run={true}/>
              }/>
            </div>
          </BrowserRouter>
        </div>
      );
    }
}
export default App;
