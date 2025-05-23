import React from 'react';
import Layout from '../components/layout/Layout';
import FilterPanel from '../components/specialists/FilterPanel';
import SpecialistGrid from '../components/specialists/SpecialistGrid';
import { Suspense } from 'react';

// Przykładowe dane specjalistów do wyświetlenia
const sampleSpecialists = [
  {
    id: 1,
    name: "Dr Anna Kowalska",
    specialization: "Psycholog kliniczny",
    photoUrl: null,
    city: "Warszawa",
    pricePerSession: 200,
    bio: "Specjalista w zakresie terapii poznawczo-behawioralnej...",
    specializations: ["depresja", "lęki", "terapia par"],
    therapyMethods: ["CBT", "Mindfulness"],
    offersOnline: true,
    offersInPerson: true,
    isVerified: true,
    experienceYears: 10
  },
  {
    id: 2,
    name: "Lek. Piotr Nowak",
    specialization: "Psychiatra",
    photoUrl: null,
    city: "Kraków", 
    pricePerSession: 300,
    bio: "Lekarz psychiatra z 15-letnim doświadczeniem...",
    specializations: ["zaburzenia nastroju", "ADHD", "farmakoterapia"],
    therapyMethods: ["Farmakoterapia", "Psychiatria integracyjna"],
    offersOnline: true,
    offersInPerson: true,
    isVerified: true,
    experienceYears: 15
  },
  {
    id: 3,
    name: "Mgr Joanna Wiśniewska",
    specialization: "Psychoterapeuta",
    photoUrl: null,
    city: "Wrocław",
    pricePerSession: 180,
    bio: "Psychoterapeuta pracujący w nurcie psychodynamicznym...",
    specializations: ["traumy", "zaburzenia osobowości", "nerwice"],
    therapyMethods: ["Psychoterapia psychodynamiczna", "Analiza marzeń sennych"],
    offersOnline: true,
    offersInPerson: false,
    isVerified: false,
    experienceYears: 8
  }
];

// W przyszłości można zmienić na Client Component i dodać rzeczywiste pobieranie danych
export default function SpecialistsPage() {
  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-8">
            Specjaliści zdrowia psychicznego
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters - W wersji client component */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <p className="text-slate-600 mb-4">
                  Filtry dostępne w wersji klienta. W tej statycznej wersji strony
                  pokazujemy przykładowych specjalistów.
                </p>
              </div>
            </div>
            
            {/* Specialists List */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-slate-600">Znaleziono {sampleSpecialists.length} specjalistów</p>
                <select 
                  className="form-input"
                  defaultValue="popularity"
                >
                  <option value="popularity">Popularność</option>
                  <option value="price_asc">Cena: od najniższej</option>
                  <option value="price_desc">Cena: od najwyższej</option>
                  <option value="experience">Doświadczenie</option>
                </select>
              </div>
              
              <Suspense fallback={<div>Ładowanie specjalistów...</div>}>
                <SpecialistGrid specialists={sampleSpecialists} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 