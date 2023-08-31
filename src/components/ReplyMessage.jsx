import { useState } from "react";
import { API } from "../api";

export default function ReplyMessage({
  fetchReplyMessages,
  message,
  setIsReplyingMessage,
}) {
  const [text, setText] = useState("");
  const handleReplyMessage = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        parentId: message.id,
      }),
    });
    const info = await res.json();
    console.log("child", info);
    if (info.success) {
      fetchReplyMessages();
      setIsReplyingMessage(false);
    }
  };

  return (
    <form onSubmit={handleReplyMessage}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Reply to this message..."
      />
      <button>Reply</button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsReplyingMessage(false);
        }}
      >
        Cancel
      </button>
    </form>
  );
}
