import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>
          Chat with your <span className="gradient-text">videos & documents</span>
        </h1>
        <p>
          Pick a source, load it, and ask questions. Answers are generated with
          Retrieval-Augmented Generation straight from your content.
        </p>
      </section>

      <section className="cards">
        <Link href="/youtube" className="glass card">
          <div className="icon">▶️</div>
          <h2>YouTube RAG</h2>
          <p>
            Paste a YouTube link, watch the video and chat with its transcript
            side by side.
          </p>
          <span className="go gradient-text">Open YouTube RAG →</span>
        </Link>

        <Link href="/pdf" className="glass card">
          <div className="icon">📄</div>
          <h2>PDF RAG</h2>
          <p>
            Upload a PDF, read it in the viewer and ask questions about it in
            the chat panel.
          </p>
          <span className="go gradient-text">Open PDF RAG →</span>
        </Link>
      </section>
    </>
  );
}
