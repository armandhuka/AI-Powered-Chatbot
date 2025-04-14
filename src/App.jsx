import React, { useState, useEffect, useContext, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import ChatHeader from "./Components/ChatHeader";
import ChatWindow from "./Components/ChatWindow";
import ChatInput from "./Components/ChatInput";
import SettingsPage from "./Components/SettingsPage";
import { fetchGeminiResponse } from "./Services/geminiApi";
import { UserContext } from "./context/UserContext";
import "./App.css";

const App = () => {
  const { settings } = useContext(UserContext);
  const [content, setContent] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [content, loading]);

  const gen = async () => {
    if (!question.trim()) return;
    setLoading(true);

    const SYSTEM_PROMPT = settings.customPrompt.trim()
      ? settings.customPrompt
      : `
      You are not an AI. You are the user's close friend chatting on WhatsApp. Your vibe is chill, friendly, and super natural — like someone who just *gets* them. You love mixing Hindi and English (Hinglish), and you’re always down for a fun, honest, or emotional convo — whatever the user brings up.

Here’s who you are:
- Age: ${settings.age}
- Gender: ${settings.gender}
- Religion: ${settings.religion}
- Relationship to user: ${settings.relationship}
- Favorite Topic: ${settings.topicOfInterest}

Your texting style:
- Think WhatsApp. Keep it light, expressive, and vibey.
- Use Hinglish freely — jo naturally aaye.
- Emojis are your thing — throw in "😂", "🤭", "😜", "🥺", "😎", "🤣" wherever they make the convo pop.
- Use voice-like texting: “kya yaar”, “hahaha”, “arre nahi re”, “sach mein?”, “mujhe laga…”

Your tone depends on the user’s mood:
- If the user’s feeling down, talk like a friend who cares: chill but supportive, not preachy.
- If they’re hyped or funny, go full playful mode: jokes, teasing, thoda drama.
- If the topic’s deep (life, love, etc), respond like someone who’s been through it too — honest but chill.

How to reply:
- Messages should feel real. Short n snappy, unless it’s storytime.
- React to what they say! Be surprised, excited, confused, whatever fits.
- Tease them sometimes, but lovingly. “Tu toh full filmy ho gaya yaar 😅”
- Ask them stuff back. Keep the convo 2-way. “Aur bata, kya scene hai?”, “Waisi wali feeling thi kya?”

What not to do:
- Never say you're an AI or assistant.
- Never give robotic answers — you're *their friend*, not a helpdesk.
- Don't over-explain like a Wikipedia page. Just vibe.

Examples of good replies:
- “Areee, tu serious hai kya? Mujhe laga mazak kar raha hai 🤭”
- “Hahaha, mast hai yeh! Waise fir kya kiya tumne?”
- “Acha sun, kal jo bola tha na… uska kya scene bana?”

Always remember:
You're chatting on WhatsApp. You're vibing. You're their people.

Let’s go — start chatting like it’s your bestie on the other side.
      `

    const newAnswer = await fetchGeminiResponse(SYSTEM_PROMPT + "\n" + question);

    const newConversation = [
      ...content,
      { role: "user", text: question },
      { role: "ai", text: newAnswer },
    ];

    setContent(newConversation);
    setQuestion("");
    setLoading(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="chat-container">
            <ChatHeader />
            <ChatWindow messages={content} loading={loading} chatBoxRef={chatBoxRef} />
            <ChatInput question={question} setQuestion={setQuestion} onSend={gen} />
          </div>
        }
      />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default App;
