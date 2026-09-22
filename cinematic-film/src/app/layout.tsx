import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#061727",
};

export const metadata: Metadata = {
  title: "BharatVista — Cinematic Travel Film Experience",
  description:
    "Discover Madhya Pradesh, Your Way. Indore → Rau Circle → Jam Gate → Maheshwar → Sahastradhara. हर सफ़र, एक नई कहानी।",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#061727] text-[#FFFDF9]">{children}</body>
    </html>
  );
}

