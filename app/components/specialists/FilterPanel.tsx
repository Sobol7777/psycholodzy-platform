import React from 'react';
import { Search, MapPin, Tag, Clock } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    specialization: string;
    city: string;
    minPrice: string;
    maxPrice: string;
    offersOnline: boolean;
    offersInPerson: boolean;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  onSearch: () => void;
}

const FilterPanel = ({ filters, setFilters, onSearch }: FilterPanelProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters((prev: any) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h2 className="text-xl font-medium text-slate-800 mb-6">Filtry wyszukiwania</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Specialization */}
        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-slate-700 mb-1">
            <div className="flex items-center gap-2">
              <Tag size={16} />
              <span>Specjalizacja</span>
            </div>
          </label>
          <select
            id="specialization"
            name="specialization"
            value={filters.specialization}
            onChange={handleChange}
            className="form-input w-full"
          >
            <option value="">Wszystkie specjalizacje</option>
            <option value="psycholog">Psycholog</option>
            <option value="psychiatra">Psychiatra</option>
            <option value="psychoterapeuta">Psychoterapeuta</option>
          </select>
        </div>
        
        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Miasto</span>
            </div>
          </label>
          <select
            id="city"
            name="city"
            value={filters.city}
            onChange={handleChange}
            className="form-input w-full"
          >
            <option value="">Wszystkie miasta</option>
            <option value="warszawa">Warszawa</option>
            <option value="krakow">Kraków</option>
            <option value="wroclaw">Wrocław</option>
            <option value="gdansk">Gdańsk</option>
            <option value="poznan">Poznań</option>
            <option value="lodz">Łódź</option>
          </select>
        </div>
        
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Cena za sesję (PLN)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                placeholder="Min"
                value={filters.minPrice}
                onChange={handleChange}
                className="form-input w-full"
                min="0"
              />
            </div>
            <div>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={handleChange}
                className="form-input w-full"
                min="0"
              />
            </div>
          </div>
        </div>
        
        {/* Visit Type */}
        <div>
          <p className="block text-sm font-medium text-slate-700 mb-3">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Typ wizyty</span>
            </div>
          </p>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="offersOnline"
                name="offersOnline"
                type="checkbox"
                checked={filters.offersOnline}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
              />
              <label htmlFor="offersOnline" className="ml-2 block text-sm text-slate-700">
                Online
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="offersInPerson"
                name="offersInPerson"
                type="checkbox"
                checked={filters.offersInPerson}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
              />
              <label htmlFor="offersInPerson" className="ml-2 block text-sm text-slate-700">
                Stacjonarnie
              </label>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="btn-accent w-full flex items-center justify-center gap-2"
        >
          <Search size={18} />
          <span>Szukaj</span>
        </button>
      </form>
    </div>
  );
};

export default FilterPanel; 