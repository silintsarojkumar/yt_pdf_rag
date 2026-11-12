import { CREATOR_NAME, CREATOR_LINK } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      Crafted with ❤️ by{" "}
      {CREATOR_LINK ? (
        <a href={CREATOR_LINK} target="_blank" rel="noreferrer">
          <strong className="gradient-text">{CREATOR_NAME}</strong>
        </a>
      ) : (
        <strong className="gradient-text">{CREATOR_NAME}</strong>
      )}{" "}
      · © {year} All rights reserved
    </footer>
  );
}
