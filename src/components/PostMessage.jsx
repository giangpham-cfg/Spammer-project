import { useState } from "react";
import { API } from "../api";

export default function PostMessage({ fetchMessages }) {
  const [text, setText] = useState("");
  const handlePostMessage = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    });
    const info = await res.json();
    if (info.success) {
      setText("");
      fetchMessages();
    }
  };

  return (
    <>
      <form onSubmit={handlePostMessage}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's your message?"
        />
        <button>Post Message</button>
      </form>
    </>
  );
}
