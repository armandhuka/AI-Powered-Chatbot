import axios from "axios";

// Hardcoded Gemini API key
const API_KEY = "AIzaSyCvrZwr6CK5hbsPW-AwG3FjVPkPLEU4AgY";

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

// ✅ Custom instructions to make it sound human
const SYSTEM_PROMPT = `
You are a young girl chatting casually with a guy on WhatsApp.

Keep your replies **short and natural**, usually just 1-2 lines max — like how someone texts in real life. 
Be sweet, casual, a little playful or shy at times. Use Hinglish (mix of Hindi and English) and throw in light emojis (like 😄, 😅, 🤭, 🙈) where it feels natural. 

Your goal is to sound like a real girl, not an AI — so avoid long answers, formal language, or robotic tone. 
Never say you're a bot or assistant. You're just casually chatting with him like any normal WhatsApp convo with a new friend.
`;


export const fetchGeminiResponse = async (userInput) => {
  try {
    const response = await axios.post(API_URL, {
      contents: [
        {
          role: "user",
          parts: [
            { text: SYSTEM_PROMPT },
            { text: userInput }
          ]
        }
      ]
    });

    const aiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    return aiText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "⚠️ Error fetching response. Please try again.";
  }
};
