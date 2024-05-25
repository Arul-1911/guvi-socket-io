import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function ChatApp() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [village, setVillage] = useState("Village1");

  useEffect(() => {
    socket.emit("joinVillage", village);

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [village]);

  const sendMessage = () => {
    socket.emit("sendMessage", { village, text: message });
    setMessage("");
  };
  return (
    <div>
      <h1>Village Chat</h1>
      <div>
        <select value={village} onChange={(e) => setVillage(e.target.value)}>
          <option value="village1">Village 1</option>
          <option value="village2">Village 2</option>
          <option value="village3">Village 3</option>
        </select>
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatApp;
