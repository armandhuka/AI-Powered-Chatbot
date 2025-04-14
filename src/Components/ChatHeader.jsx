import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ChatHeader = () => {
  const { settings } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="chat-header" onClick={() => navigate("/settings")}>
      <img
        src={settings.profilePic}
        alt="Profile"
        className="profile-pic"
      />
      <div className="contact-info">
        <div className="contact-name">{settings.name}</div>
        <div className="last-seen">online</div>
      </div>
    </div>
  );
};

export default ChatHeader;
