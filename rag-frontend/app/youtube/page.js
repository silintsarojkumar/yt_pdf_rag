"use client";

import { useState } from "react";
import Chat from "@/components/Chat";
import { registerYoutube, getYoutubeId } from "@/lib/api";

export default function YoutubePage() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLoad(e) {
    e.preventDefault();
    setError("");

    const id = getYoutubeId(url.trim());
    if (!id) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    setLoading(true);
    try {
      const data = await registerYoutube(url.trim());
      setSessionId(data.session_id);
      setVideoId(id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="page-title">
        <span className="gradient-text">YouTube RAG</span>
      </h1>

      <form className="glass input-row" onSubmit={handleLoad}>
        <input
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Loading…" : "Load video"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}

      <div className="workspace">
        <div className="glass panel">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="placeholder">
              ▶️ <br />
              Paste a YouTube link above to play the video here.
            </div>
          )}
        </div>

        <Chat
          sessionId={sessionId}
          title="Chat with the video"
          emptyText="Load a video to start chatting."
        />
      </div>
    </>
  );
}
