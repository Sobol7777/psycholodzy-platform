'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../components/layout/Layout';
import SpecialistGrid from '../components/specialists/SpecialistGrid';
import FilterPanel from '../components/specialists/FilterPanel';
import Breadcrumbs from '../components/ui/Breadcrumbs';

// Typ dla specjalisty z bazy danych
type Specialist = {
  id: number;
  name: string;
  specialization: string | null;
  photoUrl: string | null;
  city: string | null;
  pricePerSession: number | null;
  specializations: string[];
  offersOnline: boolean;
  offersInPerson: boolean;
  isVerified: boolean;
  calUserId?: string | null;
};

// Typ dla danych z API (przed konwersją)
type SpecialistFromAPI = {
  id: number;
  name: string;
  specialization: string | null;
  photoUrl: string | null;
  city: string | null;
  pricePerSession: number | null;
  specializations: string; // JSON string
  offersOnline: boolean;
  offersInPerson: boolean;
  isVerified: boolean;
  calUserId?: string | null;
};

export default function SpecialistsPage() {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtry
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [offersOnline, setOffersOnline] = useState(false);
  const [offersInPerson, setOffersInPerson] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');

  // Paginacja
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // 12 specjalistów na stronę

  // Pobieranie danych
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/specialists');
        if (!response.ok) {
          throw new Error('Błąd podczas pobierania specjalistów');
        }
        const data = await response.json();
        
        // Konwersja danych z bazy do formatu oczekiwanego przez komponenty
        const formattedSpecialists = data.map((specialist: SpecialistFromAPI) => ({
          ...specialist,
          specializations: specialist.specializations 
            ? JSON.parse(specialist.specializations).filter((s: string) => s.trim())
            : []
        }));
        
        setSpecialists(formattedSpecialists);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecialists();
  }, []);

  // Obsługa parametrów URL z wyszukiwania
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const specializationParam = urlParams.get('specialization');
    const cityParam = urlParams.get('city');
    
    if (specializationParam) {
      setSelectedSpecialization(specializationParam);
    }
    if (cityParam) {
      setSelectedCity(cityParam);
    }
  }, []);

  // Dostępne opcje filtrów
  const availableCities = useMemo(() => {
    const cities = specialists
      .map(s => s.city)
      .filter((city): city is string => Boolean(city))
      .filter((city, index, arr) => arr.indexOf(city) === index)
      .sort();
    return cities;
  }, [specialists]);

  const availableSpecializations = useMemo(() => {
    const specializations = specialists
      .map(s => s.specialization)
      .filter((spec): spec is string => Boolean(spec))
      .filter((spec, index, arr) => arr.indexOf(spec) === index)
      .sort();
    return specializations;
  }, [specialists]);

  // Filtrowanie i sortowanie specjalistów
  const filteredAndSortedSpecialists = useMemo(() => {
    const filtered = specialists.filter((specialist: Specialist) => {
      // Wyszukiwanie po nazwie lub specjalizacjach
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = specialist.name.toLowerCase().includes(query);
        const matchesSpecialization = specialist.specialization?.toLowerCase().includes(query);
        const matchesSpecializations = specialist.specializations.some(s => 
          s.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesSpecialization && !matchesSpecializations) {
          return false;
        }
      }

      // Filtr miasta
      if (selectedCity && specialist.city !== selectedCity) {
        return false;
      }

      // Filtr specjalizacji
      if (selectedSpecialization && specialist.specialization !== selectedSpecialization) {
        return false;
      }

      // Filtr ceny
      if (specialist.pricePerSession) {
        if (specialist.pricePerSession < priceRange[0] || 
            (priceRange[1] < 1000 && specialist.pricePerSession > priceRange[1])) {
          return false;
        }
      }

      // Filtr typu wizyt
      if (offersOnline && !specialist.offersOnline) {
        return false;
      }
      if (offersInPerson && !specialist.offersInPerson) {
        return false;
      }

      return true;
    });

    // Sortowanie
    switch (sortBy) {
      case 'name_asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price_asc':
        filtered.sort((a, b) => {
          const priceA = a.pricePerSession || 0;
          const priceB = b.pricePerSession || 0;
          return priceA - priceB;
        });
        break;
      case 'price_desc':
        filtered.sort((a, b) => {
          const priceA = a.pricePerSession || 0;
          const priceB = b.pricePerSession || 0;
          return priceB - priceA;
        });
        break;
      case 'verified':
        filtered.sort((a, b) => {
          if (a.isVerified && !b.isVerified) return -1;
          if (!a.isVerified && b.isVerified) return 1;
          return 0;
        });
        break;
      case 'popularity':
      default:
        // Sortowanie domyślne: zweryfikowani na górze, potem alfabetycznie
        filtered.sort((a, b) => {
          if (a.isVerified && !b.isVerified) return -1;
          if (!a.isVerified && b.isVerified) return 1;
          return a.name.localeCompare(b.name);
        });
        break;
    }

    return filtered;
  }, [specialists, searchQuery, selectedCity, selectedSpecialization, priceRange, offersOnline, offersInPerson, sortBy]);

  // Paginacja - oblicz dane dla aktualnej strony
  const totalPages = Math.ceil(filteredAndSortedSpecialists.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSpecialists = filteredAndSortedSpecialists.slice(startIndex, endIndex);

  // Reset strony przy zmianie filtrów
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCity, selectedSpecialization, priceRange, offersOnline, offersInPerson, sortBy]);

  // Funkcja czyszczenia filtrów
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedSpecialization('');
    setPriceRange([0, 1000]);
    setOffersOnline(false);
    setOffersInPerson(false);
    setSortBy('popularity');
    setCurrentPage(1);
  };

  if (error) {
    return (
      <Layout>
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs 
            items={[
              { label: 'Specjaliści' }
            ]} 
          />
          
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-8">
            Specjaliści zdrowia psychicznego
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <FilterPanel
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCity={selectedCity}
                  onCityChange={setSelectedCity}
                  selectedSpecialization={selectedSpecialization}
                  onSpecializationChange={setSelectedSpecialization}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  offersOnline={offersOnline}
                  onOffersOnlineChange={setOffersOnline}
                  offersInPerson={offersInPerson}
                  onOffersInPersonChange={setOffersInPerson}
                  onClearFilters={clearFilters}
                  availableCities={availableCities}
                  availableSpecializations={availableSpecializations}
                />
              </div>
            </div>
            
            {/* Specialists List */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-slate-600">
                  {isLoading ? 'Ładowanie...' : `Znaleziono ${filteredAndSortedSpecialists.length} specjalistów`}
                  {filteredAndSortedSpecialists.length !== specialists.length && specialists.length > 0 && (
                    <span className="text-slate-500"> (z {specialists.length} dostępnych)</span>
                  )}
                  {totalPages > 1 && (
                    <span className="text-slate-500"> - Strona {currentPage} z {totalPages}</span>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-slate-600">
                    Sortuj:
                  </label>
                  <select 
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-300 rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800 transition-all hover:border-slate-400"
                  >
                    <option value="popularity">Popularność</option>
                    <option value="name_asc">Nazwa A-Z</option>
                    <option value="name_desc">Nazwa Z-A</option>
                    <option value="price_asc">Cena: od najniższej</option>
                    <option value="price_desc">Cena: od najwyższej</option>
                    <option value="verified">Zweryfikowani najpierw</option>
                  </select>
                </div>
              </div>
              
              {/* Success info */}
              {!isLoading && specialists.length > 0 && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    ✅ Dane pobrane bezpośrednio z bazy danych. Znaleziono {specialists.length} specjalistów.
                  </p>
                </div>
              )}
              
              <SpecialistGrid specialists={currentSpecialists} isLoading={isLoading} />
              
              {/* Paginacja */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Poprzednia
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          currentPage === page
                            ? 'bg-teal-700 text-white'
                            : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Następna
                    </button>
                  </nav>
                </div>
              )}
              
              {/* Brak wyników */}
              {!isLoading && filteredAndSortedSpecialists.length === 0 && specialists.length > 0 && (
                <div className="text-center py-12">
                  <div className="text-slate-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Brak wyników
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Nie znaleziono specjalistów spełniających wybrane kryteria.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-teal-700 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Wyczyść filtry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 