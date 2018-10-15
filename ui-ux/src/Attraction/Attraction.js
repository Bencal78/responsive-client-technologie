import React, { Component } from 'react';

class Attraction extends Component {
  constructor(props) {
    super(props);
    this.state = {
       id : '',
       name : '',
       date : null,
       price : 0
     }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  handleSend(event) {
    this.props.onSend(this.props.name, this.state.chat);
    this.setState({
      chat: ''
    });
  }

  displayChat() {
    let chat = this.props.display.map((item, index) => {
      return (
        <li key={index} style={{listStyleType: "none"}}>
          <p>{item}</p>
        </li>
      );
    });
    return (<div id="display">{chat}</div>);
  }

  render() {
    return (
      <div>
        { this.displayChat() }
        <div>
          <input type="text" name="chat" onChange={(e) => this.handleChange(e)}
            value={this.state.chat} />
          <button onClick={(e) => this.handleSend(e)}>Envoyer</button>
        </div>
      </div>
    );
  }
}
export default Attraction;
