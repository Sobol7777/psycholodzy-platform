"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-sans text-2xl font-semibold text-slate-800 tracking-tight">
              Open<span className="text-teal-700">Mind</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link 
              href="/specjalisci" 
              className="font-medium text-lg text-slate-600 hover:text-slate-900 transition-colors py-2"
            >
              Specjaliści
            </Link>
            <Link 
              href="#jak-to-dziala" 
              className="font-medium text-lg text-slate-600 hover:text-slate-900 transition-colors py-2"
            >
              Jak to działa
            </Link>
            <Link 
              href="/o-nas" 
              className="font-medium text-lg text-slate-600 hover:text-slate-900 transition-colors py-2"
            >
              O nas
            </Link>
            <Link 
              href="/kontakt" 
              className="font-medium text-lg text-slate-600 hover:text-slate-900 transition-colors py-2"
            >
              Kontakt
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Otwórz menu</span>
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden",
        isMenuOpen ? "block" : "hidden"
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-slate-200">
          <Link 
            href="/specjalisci" 
            className="block px-3 py-3 rounded-md text-lg font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Specjaliści
          </Link>
          <Link 
            href="#jak-to-dziala" 
            className="block px-3 py-3 rounded-md text-lg font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Jak to działa
          </Link>
          <Link 
            href="/o-nas" 
            className="block px-3 py-3 rounded-md text-lg font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            onClick={() => setIsMenuOpen(false)}
          >
            O nas
          </Link>
          <Link 
            href="/kontakt" 
            className="block px-3 py-3 rounded-md text-lg font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Kontakt
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 