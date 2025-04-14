import React from 'react';

const MessageBubble = ({ text, role, typing }) => {
  return (
    <div className={`message ${role}`}>
      {typing ? <em>{text}</em> : text}
    </div>
  );
};

export default MessageBubble;
