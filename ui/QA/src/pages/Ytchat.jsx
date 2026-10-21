import { useState } from "react";
import axios from "axios";

function Ytchat() {
  const [videoUrl, setVideoUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getVideoId = (url) => {
    const regExp =
      /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;

    const match = url.match(regExp);

    return match && match[1].length === 11
      ? match[1]
      : null;
  };

  const loadVideo = async () => {
    try {
      setLoading(true);

      const id = getVideoId(videoUrl);

      if (!id) {
        alert("Invalid YouTube URL");
        return;
      }

      setEmbedUrl(
        `https://www.youtube.com/embed/${id}`
      );

      await axios.post(
        "http://localhost:5000/video",
        {
          url: videoUrl,
        }
      );

      alert("Transcript Loaded");
    } catch (error) {
  console.error("FULL ERROR:", error);
  console.error("RESPONSE:", error.response?.data);

  alert(
    JSON.stringify(error.response?.data) ||
    "Failed to load transcript"
  );
} finally {
      setLoading(false);
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/chat",
        {
          question,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          question,
          answer: res.data.answer,
        },
      ]);

      setQuestion("");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.error ||
          "Something went wrong"
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      {/* LEFT */}
      <div
        style={{
          width: "60%",
          padding: "20px",
        }}
      >
        <h2>YouTube Video QA</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Paste YouTube URL"
            value={videoUrl}
            onChange={(e) =>
              setVideoUrl(e.target.value)
            }
            style={{
              flex: 1,
              padding: "10px",
            }}
          />

          <button onClick={loadVideo}>
            {loading
              ? "Loading..."
              : "Load Video"}
          </button>
        </div>

        {embedUrl && (
          <iframe
            width="100%"
            height="600"
            src={embedUrl}
            title="YouTube Video"
            allowFullScreen
          />
        )}
      </div>

      {/* RIGHT */}
      <div
        style={{
          width: "40%",
          borderLeft: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
              }}
            >
              <p>
                <strong>You:</strong>{" "}
                {msg.question}
              </p>

              <p>
                <strong>Bot:</strong>{" "}
                {msg.answer}
              </p>

              <hr />
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="Ask a question..."
            style={{
              flex: 1,
              padding: "10px",
            }}
          />

          <button onClick={askQuestion}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ytchat;