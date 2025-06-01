import React from "react";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";
import { Providers } from "./providers";
import { ToastProvider } from './components/ui/ToastContainer';

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "OpenMind - Znajdź swojego specjalistę",
  description: "OpenMind - platforma rezerwacji wizyt u psychologów, psychiatrów i psychoterapeutów w Polsce",
  keywords: ['psycholog', 'psychiatra', 'psychoterapeuta', 'terapia', 'zdrowie psychiczne', 'wizyty online'],
  authors: [{ name: 'OpenMind Team' }],
  openGraph: {
    title: 'OpenMind - Platforma Psychologów',
    description: 'Znajdź idealnego specjalistę dla Twojego zdrowia psychicznego',
    type: 'website',
    locale: 'pl_PL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenMind - Platforma Psychologów',
    description: 'Znajdź idealnego specjalistę dla Twojego zdrowia psychicznego',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`bg-slate-50 min-h-screen ${inter.className}`}>
        <Providers>
          <ToastProvider>
            <ScrollToTop />
            {children}
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
} 