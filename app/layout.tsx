import type { Metadata } from "next";
import "./globals.css";
import "./journal.css";
import "./route.css";
export const metadata: Metadata = {
  title: "Treasure Expedition",
  description:
    "Explore the Lost Island by solving its inscriptions and riddles, then catalogue recovered artifacts or trade with other explorers.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
