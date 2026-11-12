"use client";

import { useEffect, useRef, useState } from "react";
import { sendChat } from "@/lib/api";

export default function Chat({ sessionId, title, emptyText }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  // Start a fresh conversation when the session changes
  useEffect(() => {
    setMessages([]);
  }, [sessionId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(e) {
    e.preventDefault();
    const question = input.trim();
    if (!question || !sessionId || loading) return;

    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const answer = await sendChat(sessionId, question);
      setMessages((m) => [...m, { role: "bot", text: answer }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "bot", text: err.message, error: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass panel">
      <div className="chat-header">💬 {title}</div>

      <div className="messages">
        {messages.length === 0 && !loading && (
          <div className="placeholder">
            {sessionId ? "Ask anything about the content 👇" : emptyText}
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`msg ${m.role === "user" ? "user" : "bot"} ${
              m.error ? "err" : ""
            }`}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="msg bot">
            <div className="dots">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={sessionId ? "Type your question…" : "Load content first"}
          disabled={!sessionId || loading}
        />
        <button
          className="btn"
          type="submit"
          disabled={!sessionId || loading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
