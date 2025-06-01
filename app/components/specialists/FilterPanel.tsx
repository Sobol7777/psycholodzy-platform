'use client';

import React from 'react';
import { Search, MapPin, DollarSign, Monitor, Clock, Filter, X, Sparkles } from 'lucide-react';

interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedSpecialization: string;
  onSpecializationChange: (specialization: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  offersOnline: boolean;
  onOffersOnlineChange: (offers: boolean) => void;
  offersInPerson: boolean;
  onOffersInPersonChange: (offers: boolean) => void;
  onClearFilters: () => void;
  availableCities: string[];
  availableSpecializations: string[];
}

const FilterPanel = ({
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  selectedSpecialization,
  onSpecializationChange,
  priceRange,
  onPriceRangeChange,
  offersOnline,
  onOffersOnlineChange,
  offersInPerson,
  onOffersInPersonChange,
  onClearFilters,
  availableCities,
  availableSpecializations
}: FilterPanelProps) => {
  const hasActiveFilters = 
    searchQuery || 
    selectedCity || 
    selectedSpecialization || 
    priceRange[0] > 0 || 
    priceRange[1] < 1000 ||
    offersOnline ||
    offersInPerson;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <div className="p-1.5 bg-white rounded-lg shadow-sm">
              <Filter size={18} className="text-teal-700" />
            </div>
            Filtry wyszukiwania
          </h3>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
            >
              <X size={16} />
              Wyczyść
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Wyszukiwanie */}
        <div className="space-y-2">
          <label htmlFor="search" className="block text-sm font-semibold text-slate-700">
            Wyszukaj specjalistę
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800 transition-all hover:border-slate-400"
              placeholder="Imię, nazwisko lub specjalizacja..."
            />
          </div>
        </div>

        {/* Miasto */}
        <div className="space-y-2">
          <label htmlFor="city" className="block text-sm font-semibold text-slate-700">
            Miasto
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              className="pl-10 w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800 appearance-none cursor-pointer transition-all hover:border-slate-400"
            >
              <option value="">Wszystkie miasta</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Specjalizacja */}
        <div className="space-y-2">
          <label htmlFor="specialization" className="block text-sm font-semibold text-slate-700">
            Typ specjalisty
          </label>
          <div className="relative">
            <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <select
              id="specialization"
              value={selectedSpecialization}
              onChange={(e) => onSpecializationChange(e.target.value)}
              className="pl-10 w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800 appearance-none cursor-pointer transition-all hover:border-slate-400"
            >
              <option value="">Wszystkie specjalizacje</option>
              {availableSpecializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Zakres cenowy - z lepszym odstępem */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700">
            Cena za sesję
          </label>
          <div className="bg-slate-50 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="text-teal-600 h-5 w-5" />
                <span className="text-sm font-medium text-slate-700">Zakres cenowy</span>
              </div>
              <span className="text-sm font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                {priceRange[0]} - {priceRange[1] === 1000 ? '1000+' : priceRange[1]} zł
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="minPrice" className="text-xs font-medium text-slate-600">
                    Minimalna cena
                  </label>
                  <span className="text-xs font-semibold text-slate-700">{priceRange[0]} zł</span>
                </div>
                <input
                  type="range"
                  id="minPrice"
                  min="0"
                  max="1000"
                  step="50"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const newMin = parseInt(e.target.value);
                    if (newMin <= priceRange[1]) {
                      onPriceRangeChange([newMin, priceRange[1]]);
                    }
                  }}
                  className="w-full h-2 bg-gradient-to-r from-slate-200 to-teal-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="maxPrice" className="text-xs font-medium text-slate-600">
                    Maksymalna cena
                  </label>
                  <span className="text-xs font-semibold text-slate-700">
                    {priceRange[1] === 1000 ? '1000+' : priceRange[1]} zł
                  </span>
                </div>
                <input
                  type="range"
                  id="maxPrice"
                  min="0"
                  max="1000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const newMax = parseInt(e.target.value);
                    if (newMax >= priceRange[0]) {
                      onPriceRangeChange([priceRange[0], newMax]);
                    }
                  }}
                  className="w-full h-2 bg-gradient-to-r from-teal-200 to-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Typ wizyt - Nowoczesne toggle switches */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700">
            Typ wizyt
          </label>
          <div className="space-y-3">
            {/* Toggle dla wizyt online */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Monitor size={18} className="text-teal-600" />
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-700">Wizyty online</span>
                  <p className="text-xs text-slate-500">Konsultacje przez internet</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={offersOnline}
                  onChange={(e) => onOffersOnlineChange(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>

            {/* Toggle dla wizyt stacjonarnych */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Clock size={18} className="text-teal-600" />
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-700">Wizyty stacjonarne</span>
                  <p className="text-xs text-slate-500">Spotkania w gabinecie</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={offersInPerson}
                  onChange={(e) => onOffersInPersonChange(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Footer z informacją o filtrach */}
      {hasActiveFilters && (
        <div className="px-6 py-4 bg-gradient-to-r from-teal-50 to-slate-50 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse"></div>
            <p className="text-sm text-slate-700">
              Filtry aktywne - wyniki są zawężone
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel; 