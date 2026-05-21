import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Readora — Build a Reading Habit, Think Deeper, Grow Together",
  description: "A premium mobile-first social reading and self-growth platform designed to help you read daily, share reflections, protect streaks, and grow closer. Duolingo meets Goodreads for aesthetic intellectuals.",
  keywords: ["reading habit", "self-growth", "streaks", "book tracker", "social reading", "journaling", "reflection"],
  authors: [{ name: "Readora Team" }],
  themeColor: "#0F0F0F",
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-[#0F0F0F] text-[#F5F1E8] min-h-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
