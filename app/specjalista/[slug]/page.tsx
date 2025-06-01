import React from 'react';
import Layout from '../../components/layout/Layout';
import Image from 'next/image';
import { MapPin, Clock, Monitor, Award, Phone, Mail } from 'lucide-react';
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import ContactForm from '../../components/specialists/ContactForm';
import StructuredData from '../../components/specialists/StructuredData';
import { Metadata } from 'next';

const prisma = new PrismaClient();

// Typ dla specjalisty z bazy danych
interface Specialist {
  id: number;
  name: string;
  specialization: string | null;
  city: string | null;
  bio: string | null;
  pricePerSession: number | null;
  phone: string | null;
  email: string;
  address: string | null;
  photoUrl: string | null;
  education: string | null;
  experienceYears: number | null;
  specializations: string;
  therapyMethods: string;
  offersOnline: boolean;
  offersInPerson: boolean;
  isVerified: boolean;
  calUserId: string | null;
}

async function getSpecialistBySlug(slug: string): Promise<Specialist | null> {
  try {
    // Konwertujemy slug na ID (zakładamy, że slug to ID specjalisty)
    const id = parseInt(slug);
    if (isNaN(id)) {
      return null;
    }

    const specialist = await prisma.specialist.findUnique({
      where: {
        id: id,
        isActive: true
      },
      select: {
        id: true,
        name: true,
        specialization: true,
        city: true,
        bio: true,
        pricePerSession: true,
        phone: true,
        email: true,
        address: true,
        photoUrl: true,
        education: true,
        experienceYears: true,
        specializations: true,
        therapyMethods: true,
        offersOnline: true,
        offersInPerson: true,
        isVerified: true,
        calUserId: true
      }
    });

    if (!specialist) {
      return null;
    }

    return {
      ...specialist,
      specializations: specialist.specializations || '',
      therapyMethods: specialist.therapyMethods || ''
    };
  } catch (error) {
    console.error('Błąd podczas pobierania specjalisty:', error);
    return null;
  }
}

// SEO Meta Tags
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const specialist = await getSpecialistBySlug(params.slug);
  
  if (!specialist) {
    return {
      title: 'Specjalista nie znaleziony - OpenMind',
      description: 'Specjalista nie został znaleziony w naszej bazie danych.'
    };
  }

  const specializations = specialist.specializations 
    ? JSON.parse(specialist.specializations).join(', ')
    : '';

  return {
    title: `${specialist.name} - ${specialist.specialization} | OpenMind`,
    description: `${specialist.name} - ${specialist.specialization} w ${specialist.city}. Specjalizacje: ${specializations}. Umów wizytę online lub stacjonarnie.`,
    keywords: [
      specialist.name,
      specialist.specialization || '',
      specialist.city || '',
      'psycholog',
      'psychiatra',
      'psychoterapeuta',
      'terapia',
      'wizyty online',
      ...JSON.parse(specialist.specializations || '[]')
    ].filter(Boolean),
    openGraph: {
      title: `${specialist.name} - ${specialist.specialization}`,
      description: `Umów wizytę u ${specialist.name} - ${specialist.specialization} w ${specialist.city}`,
      type: 'profile',
      images: specialist.photoUrl ? [specialist.photoUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${specialist.name} - ${specialist.specialization}`,
      description: `Umów wizytę u ${specialist.name} - ${specialist.specialization} w ${specialist.city}`,
    }
  };
}

export default async function SpecialistPage({ params }: { params: { slug: string } }) {
  const specialist = await getSpecialistBySlug(params.slug);

  if (!specialist) {
    notFound();
  }

  const specializations = specialist.specializations 
    ? JSON.parse(specialist.specializations).filter((s: string) => s.trim())
    : [];
  const therapyMethods = specialist.therapyMethods 
    ? JSON.parse(specialist.therapyMethods).filter((m: string) => m.trim())
    : [];

  return (
    <Layout>
      <StructuredData specialist={specialist} />
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header z podstawowymi informacjami */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Zdjęcie */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-lg border-2 border-slate-200 overflow-hidden bg-slate-100">
                  {specialist.photoUrl ? (
                    <Image
                      src={specialist.photoUrl}
                      alt={specialist.name}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <Award size={48} />
                    </div>
                  )}
                </div>
              </div>

              {/* Informacje podstawowe */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-2">
                      {specialist.name}
                    </h1>
                    <p className="text-xl text-slate-600 font-mono mb-2">
                      {specialist.specialization}
                    </p>
                    {specialist.isVerified && (
                      <div className="flex items-center gap-2 text-teal-700 mb-4">
                        <Award size={20} />
                        <span className="text-sm font-medium">Zweryfikowany specjalista</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-semibold text-slate-900 mb-1">
                      {specialist.pricePerSession ? `${specialist.pricePerSession} zł` : 'Cena do uzgodnienia'}
                    </div>
                    <div className="text-sm text-slate-500">za sesję</div>
                  </div>
                </div>

                {/* Lokalizacja i typy wizyt */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {specialist.city && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin size={16} />
                      <span>{specialist.city}</span>
                    </div>
                  )}
                  {specialist.offersOnline && (
                    <div className="flex items-center gap-2 text-teal-700">
                      <Monitor size={16} />
                      <span>Wizyty online</span>
                    </div>
                  )}
                  {specialist.offersInPerson && (
                    <div className="flex items-center gap-2 text-slate-700">
                      <Clock size={16} />
                      <span>Wizyty stacjonarne</span>
                    </div>
                  )}
                </div>

                {/* Kontakt */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {specialist.phone && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone size={16} />
                      <span>{specialist.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail size={16} />
                    <span>{specialist.email}</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  {specialist.calUserId && (
                    <a
                      href={`https://cal.com/${specialist.calUserId}/consultation`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-md tracking-wide transition-colors"
                    >
                      Umów wizytę
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Główna kolumna */}
            <div className="lg:col-span-2 space-y-8">
              {/* O mnie */}
              {specialist.bio && (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                  <h2 className="text-2xl font-medium text-slate-800 mb-4">O mnie</h2>
                  <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {specialist.bio}
                  </div>
                </div>
              )}

              {/* Specjalizacje */}
              {specializations.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                  <h2 className="text-2xl font-medium text-slate-800 mb-4">Obszary pomocy</h2>
                  <div className="flex flex-wrap gap-2">
                    {specializations.map((spec: string, index: number) => (
                      <span
                        key={index}
                        className="bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-sm font-medium border border-teal-200"
                      >
                        {spec.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Metody terapii */}
              {therapyMethods.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                  <h2 className="text-2xl font-medium text-slate-800 mb-4">Metody terapii</h2>
                  <div className="flex flex-wrap gap-2">
                    {therapyMethods.map((method: string, index: number) => (
                      <span
                        key={index}
                        className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium border border-slate-300"
                      >
                        {method.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Wykształcenie i doświadczenie */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-xl font-medium text-slate-800 mb-4">Kwalifikacje</h3>
                <div className="space-y-4">
                  {specialist.experienceYears && (
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Doświadczenie</div>
                      <div className="text-slate-800 font-medium">
                        {specialist.experienceYears} {specialist.experienceYears === 1 ? 'rok' : 
                         specialist.experienceYears < 5 ? 'lata' : 'lat'}
                      </div>
                    </div>
                  )}
                  {specialist.education && (
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Wykształcenie</div>
                      <div className="text-slate-800 whitespace-pre-line">
                        {specialist.education}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Lokalizacja */}
              {specialist.address && (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                  <h3 className="text-xl font-medium text-slate-800 mb-4">Lokalizacja</h3>
                  <div className="text-slate-600">
                    {specialist.address}
                  </div>
                </div>
              )}

              {/* Dostępność */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-xl font-medium text-slate-800 mb-4">Dostępność</h3>
                <div className="space-y-2">
                  {specialist.offersOnline && (
                    <div className="flex items-center gap-2 text-teal-700">
                      <Monitor size={16} />
                      <span>Wizyty online</span>
                    </div>
                  )}
                  {specialist.offersInPerson && (
                    <div className="flex items-center gap-2 text-slate-700">
                      <Clock size={16} />
                      <span>Wizyty stacjonarne</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Formularz kontaktowy */}
              <ContactForm 
                specialistId={specialist.id} 
                specialistName={specialist.name} 
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}