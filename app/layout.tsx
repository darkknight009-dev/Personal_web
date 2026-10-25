import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ishaan Rai — AI/ML Trainee, RAG builder, and explorer",
  description:
    "Ishaan Rai is an AI/ML developer and final-year computer science student building practical AI products, scalable systems, and real-world solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
