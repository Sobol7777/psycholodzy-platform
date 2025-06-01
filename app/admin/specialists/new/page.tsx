'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function NewSpecialist() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
    city: '',
    bio: '',
    pricePerSession: '',
    phone: '',
    photoUrl: '',
    education: '',
    certifications: '',
    specializations: '',
    therapyMethods: '',
    experienceYears: '',
    offersOnline: false,
    offersInPerson: false,
    calUserId: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/specialists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          pricePerSession: parseInt(formData.pricePerSession) || null,
          experienceYears: parseInt(formData.experienceYears) || null
        })
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        alert('Błąd podczas dodawania specjalisty');
      }
    } catch (error) {
      console.error('Error creating specialist:', error);
      alert('Błąd podczas dodawania specjalisty');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (!session || session.user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Brak uprawnień</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link
              href="/admin"
              className="flex items-center text-slate-600 hover:text-slate-900 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Powrót
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Dodaj nowego specjalistę</h1>
              <p className="text-slate-600">Wypełnij formularz aby dodać specjalistę do platformy</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Podstawowe informacje */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Imię i nazwisko *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                  placeholder="Dr Anna Kowalska"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                  placeholder="anna.kowalska@example.com"
                />
              </div>

              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-slate-700 mb-2">
                  Specjalizacja *
                </label>
                <select
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                >
                  <option value="">Wybierz specjalizację</option>
                  <option value="Psycholog">Psycholog</option>
                  <option value="Psychiatra">Psychiatra</option>
                  <option value="Psychoterapeuta">Psychoterapeuta</option>
                  <option value="Psycholog kliniczny">Psycholog kliniczny</option>
                  <option value="Psycholog dziecięcy">Psycholog dziecięcy</option>
                </select>
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">
                  Miasto *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                  placeholder="Warszawa"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                  placeholder="+48 123 456 789"
                />
              </div>

              <div>
                <label htmlFor="pricePerSession" className="block text-sm font-medium text-slate-700 mb-2">
                  Cena za sesję (PLN)
                </label>
                <input
                  type="number"
                  id="pricePerSession"
                  name="pricePerSession"
                  value={formData.pricePerSession}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                  placeholder="200"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-slate-700 mb-2">
                Opis / Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                placeholder="Krótki opis specjalisty, doświadczenia i podejścia do terapii..."
              />
            </div>

            {/* Dodatkowe informacje */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="education" className="block text-sm font-medium text-slate-700 mb-2">
                  Wykształcenie
                </label>
                <textarea
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                  placeholder="Uniwersytet Warszawski, Psychologia..."
                />
              </div>

              <div>
                <label htmlFor="experienceYears" className="block text-sm font-medium text-slate-700 mb-2">
                  Lata doświadczenia
                </label>
                <input
                  type="number"
                  id="experienceYears"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                  placeholder="5"
                />
              </div>
            </div>

            {/* Specjalizacje i metody */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="specializations" className="block text-sm font-medium text-slate-700 mb-2">
                  Obszary pomocy (oddzielone przecinkami)
                </label>
                <input
                  type="text"
                  id="specializations"
                  name="specializations"
                  value={formData.specializations}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                  placeholder="depresja, lęki, terapia par"
                />
              </div>

              <div>
                <label htmlFor="therapyMethods" className="block text-sm font-medium text-slate-700 mb-2">
                  Metody terapii (oddzielone przecinkami)
                </label>
                <input
                  type="text"
                  id="therapyMethods"
                  name="therapyMethods"
                  value={formData.therapyMethods}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                  placeholder="CBT, psychodynamiczna, systemowa"
                />
              </div>
            </div>

            {/* Cal.com i zdjęcie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="calUserId" className="block text-sm font-medium text-slate-700 mb-2">
                  Cal.com User ID
                </label>
                <input
                  type="text"
                  id="calUserId"
                  name="calUserId"
                  value={formData.calUserId}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                  placeholder="anna-kowalska"
                />
              </div>

              <div>
                <label htmlFor="photoUrl" className="block text-sm font-medium text-slate-700 mb-2">
                  URL zdjęcia
                </label>
                <input
                  type="url"
                  id="photoUrl"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            {/* Checkboxy */}
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="offersOnline"
                  checked={formData.offersOnline}
                  onChange={handleChange}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                />
                <span className="ml-2 text-sm text-slate-700">Oferuje wizyty online</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="offersInPerson"
                  checked={formData.offersInPerson}
                  onChange={handleChange}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                />
                <span className="ml-2 text-sm text-slate-700">Oferuje wizyty stacjonarne</span>
              </label>
            </div>

            {/* Przyciski */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
              <Link
                href="/admin"
                className="px-6 py-3 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Anuluj
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-teal-700 hover:bg-teal-600 disabled:bg-slate-400 text-white rounded-md flex items-center transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Zapisywanie...' : 'Zapisz specjalistę'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 