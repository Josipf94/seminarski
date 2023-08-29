import React, { Component } from 'react';
import './App.css';
import Messages from './Messages';
import Input from './Input';

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      member: {
        username: '',
        color: randomColor(),
      },
    };

    this.drone = new window.Scaledrone('FNHqOKcAeXcQwp8y', {
      data: this.state.member,
    });
  }

  componentDidMount() {
    const { member } = this.state;

    if (!member.username) {
      const username = prompt('Unesite svoje ime:');
      while (!username) {
        alert('Unesite svoje ime!');
      }

      console.log('Uneseno korisničko ime:', username); // Dodajte ovu liniju
      member.username = username;
      member.id = this.drone.clientId;
      this.setState({ member }, () => {
        this.initializeChat();
      });
    } else {
      this.initializeChat();
    }
  }

  initializeChat = () => {
    const room = this.drone.subscribe('observable-room');
    room.on('data', (data, member) => {
      this.setState((prevState) => ({
        messages: [...prevState.messages, { member, text: data }],
      }));
    });

    this.drone.on('open', (error) => {
      if (error) {
        return console.error(error);
      }
    });
  };

  onSendMessage = (message) => {
    this.drone.publish({
      room: 'observable-room',
      message,
    });
  };

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h1>My Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}

export default App;
