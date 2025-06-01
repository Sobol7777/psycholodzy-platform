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

// Loading Skeleton Component
const SpecialistCardSkeleton = () => (
  <div className="card animate-pulse">
    <div className="flex flex-col md:flex-row gap-6">
      {/* Photo skeleton */}
      <div className="flex-shrink-0">
        <div className="w-24 h-24 rounded-lg bg-slate-200"></div>
      </div>

      {/* Details skeleton */}
      <div className="flex-grow">
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-3"></div>
        
        {/* Specializations skeleton */}
        <div className="flex gap-2 mb-3">
          <div className="h-6 bg-slate-200 rounded-full w-16"></div>
          <div className="h-6 bg-slate-200 rounded-full w-20"></div>
          <div className="h-6 bg-slate-200 rounded-full w-14"></div>
        </div>
        
        {/* Location skeleton */}
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
      </div>

      {/* Price & CTA skeleton */}
      <div className="flex flex-col justify-between items-end">
        <div className="h-6 bg-slate-200 rounded w-16 mb-2"></div>
        <div className="h-10 bg-slate-200 rounded w-24"></div>
      </div>
    </div>
  </div>
);

const SpecialistGrid = ({ specialists, isLoading = false }: SpecialistGridProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 6 }, (_, index) => (
          <SpecialistCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (specialists.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          Brak specjalistów
        </h3>
        <p className="text-slate-600">
          Nie znaleziono żadnych specjalistów w bazie danych.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {specialists.map((specialist) => (
        <SpecialistCard key={specialist.id} specialist={specialist} />
      ))}
    </div>
  );
};

export default SpecialistGrid; 