import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-800 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-medium text-white mb-4">OpenMind</h3>
            <p className="text-slate-400">Łączymy pacjentów z najlepszymi specjalistami zdrowia psychicznego w Polsce.</p>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Szybkie linki</h4>
            <ul className="space-y-2">
              <li><Link href="/specjalisci" className="text-slate-400 hover:text-white transition-colors">Znajdź specjalistę</Link></li>
              <li><Link href="#jak-to-dziala" className="text-slate-400 hover:text-white transition-colors">Jak to działa</Link></li>
              <li><Link href="/o-nas" className="text-slate-400 hover:text-white transition-colors">O nas</Link></li>
              <li><Link href="/kontakt" className="text-slate-400 hover:text-white transition-colors">Kontakt</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Kontakt</h4>
            <p className="text-slate-400 mb-2">kontakt@openmind.pl</p>
            <p className="text-slate-400">+48 123 456 789</p>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} OpenMind. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 