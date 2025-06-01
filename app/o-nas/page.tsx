'use client';

import Layout from '../components/layout/Layout';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-4">
              O platformie OpenMind
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Innowacyjne rozwiązanie dla zdrowia psychicznego w Polsce
            </p>
          </div>

          {/* Sekcja o twórcy */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">AS</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-medium text-slate-800 mb-4">
                  Antoni Sobol
                </h2>
                <p className="text-slate-600 mb-6">
                  Twórca i główny deweloper platformy OpenMind. Pasjonat technologii i innowacji w obszarze zdrowia psychicznego.
                  Moją misją jest ułatwienie dostępu do profesjonalnej pomocy psychologicznej w Polsce poprzez nowoczesne rozwiązania technologiczne.
                </p>
                <div className="flex gap-4">
                  <Link 
                    href="https://github.com/antonisobol" 
                    target="_blank"
                    className="flex items-center gap-2 text-slate-700 hover:text-teal-700 transition-colors"
                  >
                    <Github size={20} />
                    <span>GitHub</span>
                  </Link>
                  <Link 
                    href="https://linkedin.com/in/antoni-sobol" 
                    target="_blank"
                    className="flex items-center gap-2 text-slate-700 hover:text-teal-700 transition-colors"
                  >
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                  </Link>
                  <Link 
                    href="mailto:antonisobol7777@gmail.com"
                    className="flex items-center gap-2 text-slate-700 hover:text-teal-700 transition-colors"
                  >
                    <Mail size={20} />
                    <span>Email</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sekcja o platformie */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-medium text-slate-800 mb-6">
              O projekcie
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">
                OpenMind to nowoczesna platforma łącząca pacjentów z najlepszymi specjalistami zdrowia psychicznego w Polsce.
                Projekt powstał z myślą o ułatwieniu dostępu do profesjonalnej pomocy psychologicznej, psychiatrycznej i psychoterapeutycznej.
              </p>
              <p className="mb-4">
                Platforma wykorzystuje najnowsze technologie, w tym:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Next.js 14 z App Router</li>
                <li>TypeScript dla bezpiecznego typowania</li>
                <li>Tailwind CSS dla nowoczesnego designu</li>
                <li>Prisma z PostgreSQL dla niezawodnej bazy danych</li>
                <li>Integrację z Cal.com dla wygodnego umawiania wizyt</li>
              </ul>
              <p>
                Naszym celem jest stworzenie przyjaznego środowiska, gdzie każdy może łatwo znaleźć odpowiedniego specjalistę
                i umówić się na konsultację, zarówno online jak i stacjonarnie.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-medium mb-4">
              Dołącz do OpenMind
            </h2>
            <p className="mb-6">
              Jesteś specjalistą zdrowia psychicznego? Dołącz do naszej platformy i pomagaj pacjentom w całej Polsce.
            </p>
            <Link 
              href="/kontakt?subject=specialist"
              className="inline-block bg-white text-teal-700 font-medium px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors"
            >
              Dołącz jako specjalista
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 