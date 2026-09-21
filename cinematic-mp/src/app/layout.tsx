import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BharatVista — Indore → Jam Gate → Maheshwar → Shastradhara | ₹700",
  description:
    "An interactive cinematic road journey through Madhya Pradesh. Indore, Jam Gate Chai & Maggie, Maheshwar Royal Dal Bafla, and Shastradhara rapids. ₹700 per person.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Rozha+One&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#061727] text-[#FFFDF9] selection:bg-[#EA580C] selection:text-white">
        {children}
      </body>
    </html>
  );
}

