import { useState } from "react";
import { API } from "../api";

export default function EditMessage({
  fetchMessages,
  message,
  setIsEditingMessage,
}) {
  const [text, setText] = useState(message.text);
  const handleEditMessage = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/message/${message.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const info = await res.json();
    if (info.success) {
      setIsEditingMessage(false);
      fetchMessages();
    }
  };

  return (
    <>
      <form onSubmit={handleEditMessage}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter new message?"
        />
        <button>Edit message</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsEditingMessage(false);
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
}
