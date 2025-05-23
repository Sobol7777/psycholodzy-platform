import React from 'react';
import SpecialistCard from './SpecialistCard';

// Definicja typu Specialist
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
};

interface SpecialistGridProps {
  specialists: Specialist[];
  isLoading?: boolean;
}

const SpecialistGrid = ({ specialists, isLoading = false }: SpecialistGridProps) => {
  if (isLoading) {
    return (
      <div className="w-full py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700"></div>
      </div>
    );
  }

  if (specialists.length === 0) {
    return (
      <div className="card bg-white text-center py-12">
        <h3 className="text-xl font-medium text-slate-700 mb-2">Brak wyników</h3>
        <p className="text-slate-600">
          Nie znaleziono specjalistów spełniających podane kryteria. Spróbuj zmienić filtry wyszukiwania.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {specialists.map((specialist) => (
        <SpecialistCard key={specialist.id} specialist={specialist} />
      ))}
    </div>
  );
};

export default SpecialistGrid; 