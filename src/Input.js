import React, { useState } from 'react';

const Input = (props) => {
  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      props.onSendMessage(text);
      setText('');
    }
  };

  return (
    <div className='Input'>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          onChange={(e) => onChange(e)}
          value={text}
          type='text'
          placeholder='Unesite poruku i pritisnite ENTER'
          autoFocus
        />
        <button>Pošalji</button>
      </form>
    </div>
  );
};

export default Input;
