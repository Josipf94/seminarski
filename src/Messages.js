import React, { Component } from 'react';

class Messages extends Component {
  messagesEndRef = React.createRef();

  componentDidUpdate() {
    // Pomaknite scroll prema dnu nakon svakog ažuriranja
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    const { messages, currentMember } = this.props;
    const reversedMessages = [...messages].reverse();

    return (
      <div className='Messages-list'>
        {reversedMessages.map((m, index) => {
          console.log('m.member.id:', m.member.id);
          console.log('currentMember.id:', currentMember.id);

          return (
            <div
              key={index}
              className={`Message ${
                m.member.id === currentMember.id ? 'MyMessage' : 'OtherMessage'
              }`}
              style={{
                backgroundColor:
                  m.member.id === currentMember.id
                    ? currentMember.color
                    : m.member.color,
              }}
            >
              <span className='Member-username'>{m.member.username}</span>{' '}
              <span className='Message-text'>{m.text}</span>
            </div>
          );
        })}
        <div ref={this.messagesEndRef} /> {/* Referenca za scroll */}
      </div>
    );
  }
}

export default Messages;
