import type { Metadata } from "next";
import "./globals.css";
import "./journal.css";
import "./route.css";
export const metadata: Metadata = {
  title: "Treasure Expedition",
  description:
    "Explore the Lost Island through math, science, reading, and evidence challenges, then collect artifacts and trade with other explorers.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
