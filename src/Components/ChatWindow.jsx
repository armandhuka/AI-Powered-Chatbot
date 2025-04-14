import React from 'react';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ messages, loading, chatBoxRef }) => {
  return (
    <div className="chat-box" ref={chatBoxRef}>
      {messages.map((msg, i) => (
        <MessageBubble key={i} text={msg.text} role={msg.role} />
      ))}
      {loading && <MessageBubble text="Typing..." role="ai" typing={true} />}
    </div>
  );
};

export default ChatWindow;
