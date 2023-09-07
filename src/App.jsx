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
    setMessages(info.messages);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  console.log("check messages", messages);

  return (
    <div className="app-container">
      <h1>Spammer</h1>
      <PostMessage fetchMessages={fetchMessages} />
      {messages.map(
        (message) => (
          // message.parentId === null ? (
          <MessageForm
            key={message.id}
            message={message}
            fetchMessages={fetchMessages}
          />
        )
        // ) : (
        //   ""
        // )
      )}
    </div>
  );
}

export default App;
