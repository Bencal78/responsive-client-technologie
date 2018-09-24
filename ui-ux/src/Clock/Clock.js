import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { date: this.props.date }
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
    this.setState({
    date: new Date()
    });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
      {this.state.date.toLocaleTimeString()}
      </div>
    );
  }
}
export default Clock;
