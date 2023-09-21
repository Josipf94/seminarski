import './App.css';
import { useEffect, useState } from 'react';
import Messages from './Messages';
import Input from './Input';

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

const App = () => {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState();

  useEffect(() => {
    let username = undefined;
    while (!username) {
      username = prompt('Unesite svoje ime:');
    }

    console.log('Uneseno korisničko ime:', username);

    setUser({
      username: username,
      color: randomColor(),
    });
  }, []);

  useEffect(() => {
    if (!user || drone) return;

    setDrone(
      new window.Scaledrone('FNHqOKcAeXcQwp8y', {
        data: user,
      })
    );
  }, [user, drone]);

  useEffect(() => {
    if (!drone) return;
    const room = drone.subscribe('observable-room');
    room.on('data', (data, member) => {
      setMessages((prevState) => {
        return [
          ...prevState,
          { member, text: data, username: member.clientData.username },
        ];
      });
    });

    drone.on('open', (error) => {
      setUser((prevState) => ({ ...prevState, id: drone.clientId }));
      if (error) {
        return console.error(error);
      }
    });
  }, [drone]);

  const onSendMessage = (message) => {
    drone.publish({
      room: 'observable-room',
      message,
    });
  };

  if (!drone || !user || !user.id) {
    return <></>;
  }

  return (
    <div className='App'>
      <div className='App-header'>
        <h1>Chat Aplikacija</h1>
      </div>
      <Messages messages={messages} currentMember={user} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
};

export default App;
