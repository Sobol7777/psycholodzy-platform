'use client';

import React from 'react';
import { Search, MapPin, DollarSign, Monitor, Clock, Filter } from 'lucide-react';

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
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-slate-800 flex items-center gap-2">
          <Filter size={20} />
          Filtry
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-teal-700 hover:text-teal-600 font-medium"
          >
            Wyczyść filtry
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Wyszukiwanie */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-2">
            Wyszukaj specjalistę
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
              placeholder="Imię, nazwisko lub specjalizacja..."
            />
          </div>
        </div>

        {/* Miasto */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">
            Miasto
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              className="pl-10 w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
            >
              <option value="">Wszystkie miasta</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Specjalizacja */}
        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-slate-700 mb-2">
            Typ specjalisty
          </label>
          <select
            id="specialization"
            value={selectedSpecialization}
            onChange={(e) => onSpecializationChange(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
          >
            <option value="">Wszystkie specjalizacje</option>
            {availableSpecializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Zakres cenowy */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Cena za sesję
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="text-slate-400 h-5 w-5" />
              <span className="text-sm text-slate-600">
                {priceRange[0]} zł - {priceRange[1] === 1000 ? '1000+ zł' : `${priceRange[1]} zł`}
              </span>
            </div>
            <div className="space-y-2">
              <div>
                <label htmlFor="minPrice" className="block text-xs text-slate-500 mb-1">
                  Od (zł)
                </label>
                <input
                  type="range"
                  id="minPrice"
                  min="0"
                  max="1000"
                  step="50"
                  value={priceRange[0]}
                  onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <div>
                <label htmlFor="maxPrice" className="block text-xs text-slate-500 mb-1">
                  Do (zł)
                </label>
                <input
                  type="range"
                  id="maxPrice"
                  min="0"
                  max="1000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Typ wizyt */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Typ wizyt
          </label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={offersOnline}
                onChange={(e) => onOffersOnlineChange(e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-600 focus:ring-offset-0"
              />
              <div className="ml-3 flex items-center gap-2">
                <Monitor size={16} className="text-slate-600" />
                <span className="text-sm text-slate-700">Wizyty online</span>
              </div>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={offersInPerson}
                onChange={(e) => onOffersInPersonChange(e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-600 focus:ring-offset-0"
              />
              <div className="ml-3 flex items-center gap-2">
                <Clock size={16} className="text-slate-600" />
                <span className="text-sm text-slate-700">Wizyty stacjonarne</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Informacja o liczbie filtrów */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            🔍 Aktywne filtry wpływają na wyniki wyszukiwania
          </p>
        </div>
      )}
    </div>
  );
};

export default FilterPanel; 