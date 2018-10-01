import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: this.props.date }
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      if(this.props.run){
        this.setState({
          date: new Date()
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  displayHour(){
    return (
      <div>
        {this.state.date.toLocaleTimeString()}
      </div>
    );
  }

  displayMessage() {
    return (
      <div>
        Clock is stopped
      </div>
    );
  }

  render() {
   return this.props.run? this.displayHour() : this.displayMessage();
  }
}
export default Clock;
