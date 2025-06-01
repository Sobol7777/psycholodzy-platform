import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from '../ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ErrorBoundary>
        <main className="flex-grow">
          {children}
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default Layout; 