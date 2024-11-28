import React, { useState } from 'react';
import axios from "axios";
import "./App.css"; // Add your CSS styles here

const App = () => {
  const [content, setContent] = useState([]);
  const [question, setQuestion] = useState("");

  async function gen() {
    console.log('Loading...');

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
    setQuestion("");
  }

  const messageStyle = (role) => ({
    backgroundColor: role === 'user' ? '#fdf2e9' : '#fae5d3',
  });

  return (
    <div className="res">

      <div >
            <div className='ans'>
        {content.map((message, index) => (
          <div>
          <p key={index} style={messageStyle(message.role)}>{message.text}</p>
          </div>
        ))}
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




  