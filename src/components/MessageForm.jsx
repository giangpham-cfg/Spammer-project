import { useState, useEffect } from "react";
import EditMessage from "./EditMessage";
import ReplyMessage from "./ReplyMessage";
import { API } from "../api";
import "./MessageForm.css";

export default function MessageForm({ message, fetchMessages }) {
  const [messages, setMessages] = useState(message.children);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [isReplyingMessage, setIsReplyingMessage] = useState(false);

  async function fetchReplyMessages() {
    const res = await fetch(`${API}/messages`);
    const info = await res.json();

    info.messages.map((parentMessage) => {
      if (parentMessage.id === message.id) {
        return setMessages(parentMessage.children);
      }
    });
  }

  useEffect(() => {
    fetchReplyMessages();
  }, []);

  const handleDeleteMessage = async (messageId) => {
    const res = await fetch(`${API}/message/${messageId}`, {
      method: "DELETE",
    });
    const info = await res.json();
    if (info.success) {
      fetchMessages();
    }
  };

  const handleUpdateLike = async (message) => {
    const res = await fetch(`${API}/message/${message.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: message.likes + 1 }),
    });
    const info = await res.json();
    if (info.success) {
      fetchMessages();
    }
  };
  return (
    <div className="message-box">
      <div className="content">
        {isEditingMessage ? (
          <EditMessage
            message={message}
            setIsEditingMessage={setIsEditingMessage}
            fetchMessages={fetchMessages}
          />
        ) : (
          <>
            <p className="text">
              {message.text}
              <span className="icon" onClick={() => setIsEditingMessage(true)}>
                ✏️
              </span>
            </p>
            <div className="icon-container">
              {isReplyingMessage ? (
                <ReplyMessage
                  fetchReplyMessages={fetchReplyMessages}
                  message={message}
                  setIsReplyingMessage={setIsReplyingMessage}
                />
              ) : (
                <>
                  <span
                    className="icon"
                    onClick={() => setIsReplyingMessage(true)}
                  >
                    Reply↩️
                  </span>
                  <span
                    className="icon"
                    onClick={() => handleUpdateLike(message)}
                  >
                    👍 {message.likes}
                  </span>
                  <span
                    className="icon"
                    onClick={() => handleDeleteMessage(message.id)}
                  >
                    Delete🗑️
                  </span>
                </>
              )}
            </div>
            {messages &&
              messages.map((childMessage) => (
                <MessageForm
                  key={childMessage.id}
                  message={childMessage}
                  fetchMessages={fetchReplyMessages}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
}
