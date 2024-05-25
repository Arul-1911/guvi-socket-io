import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000') 

function ChatApp() {
   const [message,setMessage] = useState('');
   const [messages, setMessages] = useState([]);
   const [village,setVillage] = useState('');

   useEffect(() => {
      socket.emit("joinVillage", village);

      socket.on("recieveMessage", (message) => {
         setMessages((prevMessage) => [...prevMessage,message])
      });

      return () => {
         socket.off("recieveMessage");
      }

   },[village]);

   const sendMessage = () => {
      socket.emit("sendMessage",{ village, text: message });
      setMessage('')
   }


  return (
    <div>
      <h1>village Chat</h1>
      <div>
        <select value={village} onChange={(e) => setVillage(e.target.value)}>
          <option value="village1">village1</option>
          <option value="village2">village2</option>
          <option value="village3">village3</option>
        </select>
      </div>
      <div>
        {messages.map((message, index) => (
          <div key={index}> {message.text}</div>
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

export default ChatApp