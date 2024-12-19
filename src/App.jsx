import React, { useState } from 'react';
import axios from "axios";
import "./App.css"; // Add your CSS styles here

const App = () => {
  const [content, setContent] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  async function gen() {
    console.log('Loading...');
    setLoading(true); // Set loading to true when the request starts

    const respon = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCvrZwr6CK5hbsPW-AwG3FjVPkPLEU4AgY",
      method: "POST",
      data: {
        contents: [
          { parts: [{ text: question }] }
        ]
      }
    });

    const newAnswer = respon.data.candidates[0].content.parts[0].text;

    const newConversation = [...content, { role: "user", text: question }, { role: "ai", text: newAnswer }];
    console.log(newConversation);

    setContent(newConversation);
    setQuestion(""); // Clear the input field
    setLoading(false); // Set loading to false when the request is done
  }

  const messageStyle = (role) => ({
    backgroundColor: role === 'user' ? '#fdf2e9' : '#fae5d3',
  });

  return (
    <div className="res">
      <div>
        <div className='ans'>
          {content.map((message, index) => (
            <div key={index}>
              <p style={messageStyle(message.role)}>{message.text}</p>
            </div>
          ))}
          {loading && <p className="loading">...</p>} {/* Show loading animation */}
        </div>

        <div className='quotation-box'>
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
          <button onClick={gen}>ASK</button>
        </div>
      </div>
    </div>
  );
};

export default App;