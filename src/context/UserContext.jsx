import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    name: "Gemini Bot",
    profilePic: "https://i.ibb.co/2WZPJ1d/profile-pic.png",
    gender: "girl",                  // boy/girl
    relationship: "friend",          // girlfriend/boyfriend/friend
    age: 22,
    religion: "Hindu",               // Hindu/Muslim/etc
    topicOfInterest: "anything",     // love/life/study/motivation/gossip
    languageStyle: "Hinglish",       // Hinglish/Hindi/English
    customPrompt: "",                // custom user prompt (optional)
  });

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
  };

  return (
    <UserContext.Provider value={{ settings, updateSettings }}>
      {children}
    </UserContext.Provider>
  );
};
