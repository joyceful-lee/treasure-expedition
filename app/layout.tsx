import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Treasure Expedition · Your next discovery awaits",
  description:
    "Solve ancient puzzles, explore a mysterious island, and collect treasures. Your adventure starts with a clue.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
