"use client";

import { useEffect, useState } from "react";
import Chat from "@/components/Chat";
import { uploadPdf } from "@/lib/api";

export default function PdfPage() {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Free the blob URL when it changes / on unmount
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  function handleFile(e) {
    const f = e.target.files?.[0];
    setError("");
    if (!f) return;
    if (!f.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are allowed.");
      return;
    }
    setFile(f);
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;
    setError("");
    setLoading(true);

    try {
      const data = await uploadPdf(file);
      setSessionId(data.session_id);
      setPdfUrl(URL.createObjectURL(file));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="page-title">
        <span className="gradient-text">PDF RAG</span>
      </h1>

      <form className="glass input-row" onSubmit={handleUpload}>
        <label className="file-label">
          📎 {file ? file.name : "Choose a PDF file…"}
          <input type="file" accept="application/pdf" onChange={handleFile} />
        </label>
        <button className="btn" type="submit" disabled={!file || loading}>
          {loading ? "Uploading…" : "Upload PDF"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}

      <div className="workspace">
        <div className="glass panel">
          {pdfUrl ? (
            <iframe src={pdfUrl} title="PDF viewer" />
          ) : (
            <div className="placeholder">
              📄 <br />
              Upload a PDF above to view it here.
            </div>
          )}
        </div>

        <Chat
          sessionId={sessionId}
          title="Chat with the PDF"
          emptyText="Upload a PDF to start chatting."
        />
      </div>
    </>
  );
}
