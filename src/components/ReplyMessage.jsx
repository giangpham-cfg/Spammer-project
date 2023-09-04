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
    <form className="reply-form" onSubmit={handleReplyMessage}>
      <input
        className="input-reply-form"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Reply to this message..."
      />
      <button className="button-reply-form">Reply</button>
      <button
        className="button-reply-form"
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
