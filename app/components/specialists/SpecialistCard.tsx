import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Monitor, Award } from 'lucide-react';

interface SpecialistCardProps {
  specialist: {
    id: number;
    name: string;
    specialization: string | null;
    photoUrl?: string | null;
    city?: string | null;
    pricePerSession?: number | null;
    specializations: string[];
    offersOnline: boolean;
    offersInPerson: boolean;
    isVerified: boolean;
    calUserId?: string | null;
  };
}

const SpecialistCard = ({ specialist }: SpecialistCardProps) => {
  const {
    id,
    name,
    specialization,
    photoUrl,
    city,
    pricePerSession,
    specializations,
    offersOnline,
    offersInPerson,
    isVerified
  } = specialist;

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-lg border-2 border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <Award size={32} />
              </div>
            )}
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-teal-700 text-white p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex-grow">
          <h3 className="text-xl font-medium text-slate-800 tracking-wide">{name}</h3>
          <p className="text-sm text-slate-600 mb-2">{specialization}</p>
          
          {/* Specializations */}
          <div className="flex flex-wrap gap-2 mb-3">
            {specializations.slice(0, 3).map((spec, index) => (
              <span
                key={index}
                className="bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-xs font-medium"
              >
                {spec}
              </span>
            ))}
            {specializations.length > 3 && (
              <span className="text-xs text-slate-500">+{specializations.length - 3}</span>
            )}
          </div>
          
          {/* Location & Visit Types */}
          <div className="flex items-center gap-4 text-slate-500 text-sm mb-3">
            {city && (
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{city}</span>
              </div>
            )}
            {offersInPerson && (
              <div className="flex items-center gap-1" title="Wizyty stacjonarne">
                <Clock size={16} />
                <span>Stacjonarnie</span>
              </div>
            )}
            {offersOnline && (
              <div className="flex items-center gap-1" title="Wizyty online">
                <Monitor size={16} />
                <span>Online</span>
              </div>
            )}
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex flex-col justify-between items-end">
          {pricePerSession && (
            <div className="text-lg font-semibold text-slate-900">{pricePerSession} zł</div>
          )}
          <Link
            href={`/specjalista/${id}`}
            className="btn-accent text-sm px-4 py-2 whitespace-nowrap"
          >
            Umów wizytę
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialistCard; 