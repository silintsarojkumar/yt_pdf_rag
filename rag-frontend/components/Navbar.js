"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/youtube", label: "YouTube RAG" },
  { href: "/pdf", label: "PDF RAG" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link href="/" className="brand">
          <svg viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0" stopColor="#4285f4" />
                <stop offset="0.55" stopColor="#9b72cb" />
                <stop offset="1" stopColor="#d96570" />
              </linearGradient>
            </defs>
            <path
              d="M12 2c.6 5.6 4.4 9.4 10 10-5.6.6-9.4 4.4-10 10-.6-5.6-4.4-9.4-10-10 5.6-.6 9.4-4.4 10-10z"
              fill="url(#g)"
            />
          </svg>
          <span className="gradient-text">RAG Studio</span>
        </Link>

        <nav className="nav-links">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
