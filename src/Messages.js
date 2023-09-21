import React, { useEffect, useRef } from 'react';

const Messages = (props) => {
  const scrollRef = useRef();

  const { messages, currentMember } = props;

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div className='Messages-list'>
      {messages.map((m, index) => {
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
                  : m.member.clientData.color,
            }}
          >
            <span className='Member-username'>{m.username}: </span>{' '}
            <span className='Message-text'>{m.text}</span>
          </div>
        );
      })}
      <div ref={scrollRef} /> {}
    </div>
  );
};

export default Messages;
