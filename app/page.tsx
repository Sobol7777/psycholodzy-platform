import React from 'react';
import Link from 'next/link';
import Layout from './components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="w-full bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Znajdź idealnego specjalistę dla Twojego zdrowia psychicznego
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            OpenMind - platforma łącząca pacjentów z najlepszymi psychologami, psychiatrami i psychoterapeutami w Polsce. 
            Wybierz specjalistę i umów wizytę online lub stacjonarnie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/specjalisci" 
              className="btn-primary text-center"
            >
              Przeglądaj specjalistów
            </Link>
            <Link 
              href="#jak-to-dziala" 
              className="btn-secondary text-center"
            >
              Jak to działa?
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section - Zmodernizowana */}
      <section className="w-full bg-gradient-to-b from-slate-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl bg-white shadow-xl border border-slate-100 overflow-hidden transform transition-all hover:shadow-2xl">
            <div className="bg-gradient-to-r from-teal-600 to-slate-700 py-6 px-8">
              <h2 className="text-2xl font-medium text-white mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Wyszukaj specjalistę
              </h2>
              <p className="text-teal-100 text-sm">Znajdź idealnego eksperta dla Twoich potrzeb</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="specialization" className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Specjalizacja
                  </label>
                  <div className="relative">
                    <select 
                      id="specialization" 
                      className="appearance-none bg-white border border-slate-300 rounded-lg pl-4 pr-10 py-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-slate-800 shadow-sm hover:border-teal-400"
                    >
                      <option value="">Wszystkie specjalizacje</option>
                      <option value="psycholog">Psycholog</option>
                      <option value="psychiatra">Psychiatra</option>
                      <option value="psychoterapeuta">Psychoterapeuta</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-teal-600">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Miasto
                  </label>
                  <div className="relative">
                    <select 
                      id="city" 
                      className="appearance-none bg-white border border-slate-300 rounded-lg pl-4 pr-10 py-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-slate-800 shadow-sm hover:border-teal-400"
                    >
                      <option value="">Wszystkie miasta</option>
                      <option value="warszawa">Warszawa</option>
                      <option value="krakow">Kraków</option>
                      <option value="wroclaw">Wrocław</option>
                      <option value="gdansk">Gdańsk</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-teal-600">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-end">
                  <button
                    type="button"
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Szukaj
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section id="jak-to-dziala" className="w-full bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-medium tracking-tight text-slate-800 mb-12">Jak to działa?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="bg-slate-800 text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 text-xl font-semibold">1</div>
              <h3 className="text-xl font-medium text-slate-800 mb-2">Wybierz specjalistę</h3>
              <p className="text-slate-600">Przeglądaj profile psychologów, psychiatrów i psychoterapeutów. Filtruj według specjalizacji, lokalizacji i metod terapii.</p>
            </div>
            <div className="card text-center">
              <div className="bg-slate-800 text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 text-xl font-semibold">2</div>
              <h3 className="text-xl font-medium text-slate-800 mb-2">Zarezerwuj wizytę</h3>
              <p className="text-slate-600">Wybierz dogodny termin z kalendarza specjalisty i zarezerwuj wizytę online lub stacjonarną.</p>
            </div>
            <div className="card text-center">
              <div className="bg-slate-800 text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 text-xl font-semibold">3</div>
              <h3 className="text-xl font-medium text-slate-800 mb-2">Odbądź konsultację</h3>
              <p className="text-slate-600">Spotkaj się ze specjalistą w gabinecie lub połącz się zdalnie przez wideokonferencję.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular categories */}
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-medium tracking-tight text-slate-800 mb-8 text-center">Popularne kategorie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/specjalisci?specialization=psycholog" className="card hover:shadow-md transition-shadow">
              <h3 className="text-xl font-medium text-slate-800 mb-2">Psycholog</h3>
              <p className="text-slate-600 mb-4">Diagnoza i wsparcie w różnych problemach psychicznych.</p>
              <div className="text-teal-700 font-medium">Sprawdź specjalistów &rarr;</div>
            </Link>
            <Link href="/specjalisci?specialization=psychiatra" className="card hover:shadow-md transition-shadow">
              <h3 className="text-xl font-medium text-slate-800 mb-2">Psychiatra</h3>
              <p className="text-slate-600 mb-4">Diagnoza, leczenie i farmakoterapia zaburzeń psychicznych.</p>
              <div className="text-teal-700 font-medium">Sprawdź specjalistów &rarr;</div>
            </Link>
            <Link href="/specjalisci?specialization=psychoterapeuta" className="card hover:shadow-md transition-shadow">
              <h3 className="text-xl font-medium text-slate-800 mb-2">Psychoterapeuta</h3>
              <p className="text-slate-600 mb-4">Długoterminowa praca nad problemami psychicznymi.</p>
              <div className="text-teal-700 font-medium">Sprawdź specjalistów &rarr;</div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
} 