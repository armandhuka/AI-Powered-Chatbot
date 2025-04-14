import React from 'react';

const ChatInput = ({ question, setQuestion, onSend }) => {
  return (
    <div className="chat-input">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type a message"
        onKeyDown={(e) => e.key === "Enter" && onSend()}
      />
      <button onClick={onSend}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;
