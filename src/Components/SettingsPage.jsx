import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const { settings, updateSettings } = useContext(UserContext);
  const [formData, setFormData] = useState(settings);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    updateSettings(formData);
    navigate("/"); // Go back to chat
  };

  return (
    <div className="settings-page">
      <h2>Customize Your Chat Settings</h2>

      <div className="input-field">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="input-field">
        <label>Profile Image URL:</label>
        <input
          type="text"
          name="profilePic"
          value={formData.profilePic}
          onChange={handleChange}
        />
      </div>

      <div className="input-field">
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="girl">Girl</option>
          <option value="boy">Boy</option>
        </select>
      </div>

      <div className="input-field">
        <label>Relationship:</label>
        <select
          name="relationship"
          value={formData.relationship}
          onChange={handleChange}
        >
          <option value="girlfriend">Girlfriend</option>
          <option value="boyfriend">Boyfriend</option>
          <option value="friend">Friend</option>
        </select>
      </div>

      <div className="input-field">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>

      <div className="input-field">
        <label>Religion:</label>
        <select
          name="religion"
          value={formData.religion}
          onChange={handleChange}
        >
          <option value="Hindu">Hindu</option>
          <option value="Muslim">Muslim</option>
          <option value="Christian">Christian</option>
          <option value="Sikh">Sikh</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="input-field">
        <label>Topic of Interest:</label>
        <select
          name="topicOfInterest"
          value={formData.topicOfInterest}
          onChange={handleChange}
        >
          <option value="love">Love</option>
          <option value="life">Life</option>
          <option value="study">Study</option>
          <option value="motivation">Motivation</option>
          <option value="gossip">Gossip</option>
          <option value="anything">Anything</option>
        </select>
      </div>

      <div className="input-field">
        <label>Language Style:</label>
        <select
          name="languageStyle"
          value={formData.languageStyle}
          onChange={handleChange}
        >
          <option value="Hinglish">Hinglish</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
        </select>
      </div>

      <div className="input-field">
        <label>Custom System Prompt:</label>
        <textarea
          name="customPrompt"
          value={formData.customPrompt}
          onChange={handleChange}
          placeholder="Write your own prompt here..."
        />
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save Settings
      </button>
      <p className="creat">Arman Dhuka</p>
    </div>
  );
};

export default SettingsPage;
