import { useEffect, useState } from "react";
import "./App.css";
import { API } from "./api";
import MessageForm from "./components/MessageForm";
import PostMessage from "./components/PostMessage";

function App() {
  const [messages, setMessages] = useState([]);
  async function fetchMessages() {
    const res = await fetch(`${API}/messages`);
    const info = await res.json();
    console.log("check", info);
    setMessages(info.messages);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <h1>Spammer</h1>
      <PostMessage fetchMessages={fetchMessages} />
      {messages.map((message) => (
        <MessageForm
          key={message.id}
          message={message}
          fetchMessages={fetchMessages}
        />
      ))}
    </>
  );
}

export default App;
