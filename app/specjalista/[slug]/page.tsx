import React from 'react';
import Layout from '../../components/layout/Layout';
import Image from 'next/image';
import { MapPin, Clock, Monitor, Award, Phone, Mail, Star } from 'lucide-react';
import { notFound } from 'next/navigation';

// Przykładowe dane specjalistów
const sampleSpecialists = [
  {
    id: 1,
    name: "Dr Anna Kowalska",
    specialization: "Psycholog kliniczny",
    city: "Warszawa",
    experience: "10 lat doświadczenia w terapii poznawczo-behawioralnej",
    description: "Specjalizuję się w terapii zaburzeń lękowych, depresji oraz problemów związanych ze stresem. Prowadzę terapię indywidualną dla dorosłych.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    calComLink: "https://cal.com/anna-kowalska",
    phone: "+48 123 456 789",
    email: "anna.kowalska@example.com",
    photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    isVerified: true,
    pricePerSession: 200,
    address: "ul. Marszałkowska 1, Warszawa",
    offersInPerson: true,
    offersOnline: true,
    calUserId: "anna-kowalska",
    bio: "Jestem psychologiem klinicznym z 10-letnim doświadczeniem w pracy z osobami dorosłymi. Specjalizuję się w terapii poznawczo-behawioralnej, która jest skuteczną metodą leczenia zaburzeń lękowych, depresji oraz problemów związanych ze stresem.",
    experienceYears: 10,
    education: "Magister psychologii klinicznej, Uniwersytet Warszawski\nSpecjalizacja w terapii poznawczo-behawioralnej\nCertyfikat terapeuty CBT",
    specializations: '["Zaburzenia lękowe", "Depresja", "Stres", "Terapia poznawczo-behawioralna"]',
    isActive: true
  },
  {
    id: 2,
    name: "Mgr Piotr Nowak",
    specialization: "Psychoterapeuta",
    city: "Kraków",
    experience: "8 lat doświadczenia w terapii par i rodzin",
    description: "Pomagam parom i rodzinom w rozwiązywaniu konfliktów oraz budowaniu lepszej komunikacji. Prowadzę również terapię indywidualną.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    calComLink: "https://cal.com/piotr-nowak",
    phone: "+48 987 654 321",
    email: "piotr.nowak@example.com",
    photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    isVerified: true,
    pricePerSession: 180,
    address: "ul. Floriańska 10, Kraków",
    offersInPerson: true,
    offersOnline: true,
    calUserId: "piotr-nowak",
    bio: "Jestem psychoterapeutą z 8-letnim doświadczeniem w pracy z parami i rodzinami. Pomagam w rozwiązywaniu konfliktów, budowaniu lepszej komunikacji oraz wzmacnianiu więzi.",
    experienceYears: 8,
    education: "Magister psychologii, Uniwersytet Jagielloński\nSzkolenie w terapii systemowej\nCertyfikat terapeuty par i rodzin",
    specializations: '["Terapia par", "Terapia rodzin", "Komunikacja", "Konflikty"]',
    isActive: true
  },
  {
    id: 3,
    name: "Dr Maria Wiśniewska",
    specialization: "Psychiatra",
    city: "Gdańsk",
    experience: "15 lat doświadczenia w psychiatrii",
    description: "Specjalizuję się w diagnostyce i leczeniu zaburzeń psychicznych. Prowadzę konsultacje psychiatryczne oraz farmakoterapię.",
    image: "https://images.unsplash.com/photo-1594824388853-d0c2d4e5b1b5?w=400&h=400&fit=crop&crop=face",
    calComLink: "https://cal.com/maria-wisniewska",
    phone: "+48 555 123 456",
    email: "maria.wisniewska@example.com",
    photoUrl: "https://images.unsplash.com/photo-1594824388853-d0c2d4e5b1b5?w=400&h=400&fit=crop&crop=face",
    isVerified: true,
    pricePerSession: 250,
    address: "ul. Długa 5, Gdańsk",
    offersInPerson: true,
    offersOnline: false,
    calUserId: "maria-wisniewska",
    bio: "Jestem psychiatrą z 15-letnim doświadczeniem w diagnostyce i leczeniu zaburzeń psychicznych. Specjalizuję się w farmakoterapii oraz kompleksowym podejściu do zdrowia psychicznego.",
    experienceYears: 15,
    education: "Doktor nauk medycznych, Gdański Uniwersytet Medyczny\nSpecjalizacja w psychiatrii\nSzkolenia w psychofarmakologii",
    specializations: '["Farmakoterapia", "Diagnostyka psychiatryczna", "Zaburzenia nastroju", "Schizofrenia"]',
    isActive: true
  },
  {
    id: 4,
    name: "Mgr Tomasz Zieliński",
    specialization: "Psycholog dziecięcy",
    city: "Wrocław",
    experience: "6 lat doświadczenia w pracy z dziećmi",
    description: "Pracuję z dziećmi i młodzieżą, pomagając w radzeniu sobie z problemami emocjonalnymi, trudnościami w nauce oraz problemami behawioralnymi.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    calComLink: "https://cal.com/tomasz-zielinski",
    phone: "+48 777 888 999",
    email: "tomasz.zielinski@example.com",
    photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    isVerified: true,
    pricePerSession: 150,
    address: "ul. Świdnicka 20, Wrocław",
    offersInPerson: true,
    offersOnline: true,
    calUserId: "tomasz-zielinski",
    bio: "Jestem psychologiem dziecięcym z 6-letnim doświadczeniem w pracy z dziećmi i młodzieżą. Pomagam w radzeniu sobie z problemami emocjonalnymi, trudnościami w nauce oraz problemami behawioralnymi.",
    experienceYears: 6,
    education: "Magister psychologii dziecięcej, Uniwersytet Wrocławski\nSzkolenie w terapii zabawowej\nCertyfikat psychologa dziecięcego",
    specializations: '["Psychologia dziecięca", "Terapia zabawowa", "Trudności w nauce", "Problemy behawioralne"]',
    isActive: true
  }
];

// Funkcja do konwersji nazwy na slug
function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ź/g, 'z')
    .replace(/ż/g, 'z')
    .replace(/\./g, '') // usuwa kropki
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') // usuwa wielokrotne myślniki
    .trim();
}

// Funkcja do znalezienia specjalisty po slug
function getSpecialistBySlug(slug: string) {
  return sampleSpecialists.find(specialist => nameToSlug(specialist.name) === slug);
}

export default async function SpecialistPage({ params }: { params: { slug: string } }) {
  const specialist = getSpecialistBySlug(params.slug);
  
  if (!specialist) {
    notFound();
  }

  // Parsowanie specjalizacji z JSON
  const specializations = specialist.specializations ? JSON.parse(specialist.specializations) : [];
  
  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                {/* Photo */}
                <div className="relative w-40 h-40 rounded-lg border-2 border-slate-200 overflow-hidden mx-auto mb-6">
                  {specialist.photoUrl ? (
                    <Image
                      src={specialist.photoUrl}
                      alt={specialist.name}
                      fill
                      sizes="(max-width: 768px) 100px, 200px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-4xl font-semibold">
                      {specialist.name.charAt(0)}
                    </div>
                  )}
                  {specialist.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-teal-700 text-white p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <h1 className="text-2xl font-semibold text-slate-800 text-center mb-1">
                  {specialist.name}
                </h1>
                <p className="text-center text-slate-600 mb-4">
                  {specialist.specialization}
                </p>
                
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-2xl font-semibold text-slate-900">
                    {specialist.pricePerSession} zł
                  </div>
                  <div className="text-sm text-slate-500">za sesję</div>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  {specialist.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-slate-500" />
                      <span>{specialist.phone}</span>
                    </div>
                  )}
                  {specialist.email && (
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-slate-500" />
                      <span>{specialist.email}</span>
                    </div>
                  )}
                  {specialist.address && (
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-slate-500" />
                      <span>{specialist.address}</span>
                    </div>
                  )}
                </div>
                
                {/* Consultation Types */}
                <div className="space-y-2 mb-6">
                  <h3 className="text-lg font-medium text-slate-800 mb-2">Formy konsultacji</h3>
                  {specialist.offersInPerson && (
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-teal-700" />
                      <span>Wizyty stacjonarne</span>
                    </div>
                  )}
                  {specialist.offersOnline && (
                    <div className="flex items-center gap-2">
                      <Monitor size={18} className="text-teal-700" />
                      <span>Wizyty online</span>
                    </div>
                  )}
                </div>
                
                {/* CTA */}
                {specialist.calUserId ? (
                  <a
                    href={`https://cal.com/${specialist.calUserId}/consultation`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-accent w-full text-center block"
                  >
                    Umów wizytę
                  </a>
                ) : (
                  <button className="btn-accent w-full text-center block opacity-50 cursor-not-allowed">
                    Rezerwacja niedostępna
                  </button>
                )}
              </div>
            </div>
            
            {/* Right Column - Detailed Info */}
            <div className="lg:col-span-2">
              {/* Bio */}
              <div className="card mb-6">
                <h2 className="text-xl font-medium text-slate-800 mb-4">O mnie</h2>
                <p className="text-slate-600 whitespace-pre-line">{specialist.bio || 'Informacje o specjaliście będą dostępne wkrótce.'}</p>
              </div>
              
              {/* Experience & Education */}
              <div className="card mb-6">
                <h2 className="text-xl font-medium text-slate-800 mb-4">Doświadczenie i edukacja</h2>
                <div className="flex items-center gap-2 mb-4">
                  <Award size={20} className="text-teal-700" />
                  <span className="text-slate-700 font-medium">{specialist.experienceYears || 0} lat doświadczenia</span>
                </div>
                <div className="text-slate-600 whitespace-pre-line">{specialist.education || 'Informacje o edukacji będą dostępne wkrótce.'}</div>
              </div>
              
              {/* Specializations */}
              <div className="card mb-6">
                <h2 className="text-xl font-medium text-slate-800 mb-4">Obszary pomocy</h2>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((spec: string, index: number) => (
                    <span
                      key={index}
                      className="bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Calendar */}
              <div className="card mb-6">
                <h2 className="text-xl font-medium text-slate-800 mb-4">Dostępne terminy</h2>
                <p className="text-slate-600 mb-4">
                  Wybierz dogodny termin, aby zarezerwować wizytę u specjalisty.
                </p>
                <div className="bg-slate-100 p-6 rounded-lg text-center">
                  <p className="text-slate-700 mb-4">
                    W tym miejscu zostanie wyświetlony kalendarz z Cal.com po integracji.
                  </p>
                  {specialist.calUserId ? (
                    <a
                      href={`https://cal.com/${specialist.calUserId}/consultation`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-accent inline-block"
                    >
                      Zobacz dostępne terminy
                    </a>
                  ) : (
                    <button className="btn-accent inline-block opacity-50 cursor-not-allowed">
                      Rezerwacja niedostępna
                    </button>
                  )}
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="card">
                <h2 className="text-xl font-medium text-slate-800 mb-4">Formularz kontaktowy</h2>
                <p className="text-slate-600 mb-4">
                  Masz pytania? Wypełnij formularz, a specjalista skontaktuje się z Tobą.
                </p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                      Imię i nazwisko
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input w-full"
                      placeholder="Twoje imię i nazwisko"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input w-full"
                      placeholder="Twój adres email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                      Telefon (opcjonalnie)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input w-full"
                      placeholder="Twój numer telefonu"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                      Wiadomość
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="form-input w-full"
                      placeholder="Twoja wiadomość"
                    ></textarea>
                  </div>
                  <div>
                    <button type="submit" className="btn-accent w-full">
                      Wyślij wiadomość
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}