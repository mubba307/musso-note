"use client";
import { useRouter } from "next/navigation";

/**
 * Navbar Component
 * Displays the app title and a logout button.
 * Uses Next.js navigation and localStorage for logout.
 */
export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">Notepad</h2>
      <style jsx>{`
        .navbar {
          background: #1f2937;
          color: #fff;
          padding: 18px 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .navbar-title {
          font-size: 1.4rem;
          font-weight: bold;
          letter-spacing: 1px;
        }
      `}</style>
    </nav>
  );
} 