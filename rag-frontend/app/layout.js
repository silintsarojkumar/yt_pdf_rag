import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "RAG Studio — Chat with YouTube & PDFs",
  description: "Ask questions about YouTube videos and PDF documents using RAG.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-blur">
          <div className="orb blue" />
          <div className="orb purple" />
          <div className="orb pink" />
        </div>

        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
