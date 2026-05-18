import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HAAT — Cash Control Platform",
  description: "Auto-Settlement prototype for HAAT operations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
