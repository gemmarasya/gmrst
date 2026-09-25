import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Our Little World",
  description: "A tiny interactive story for two.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
