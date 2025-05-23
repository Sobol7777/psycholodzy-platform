import React from "react";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "OpenMind - Znajdź swojego specjalistę",
  description: "OpenMind - platforma rezerwacji wizyt u psychologów, psychiatrów i psychoterapeutów w Polsce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`bg-slate-50 min-h-screen ${inter.className}`}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
} 