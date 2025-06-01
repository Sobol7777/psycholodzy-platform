'use client';

import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useToast } from '../components/ui/ToastContainer';

export default function ContactPage() {
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Symulacja wysyłania (można później podłączyć prawdziwy endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sukces
      addToast({
        type: 'success',
        title: 'Wiadomość wysłana!',
        message: 'Dziękujemy za kontakt. Odpowiemy w ciągu 24 godzin.',
        duration: 6000
      });

      // Wyczyść formularz
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch {
      // Błąd
      addToast({
        type: 'error',
        title: 'Błąd wysyłania',
        message: 'Wystąpił problem podczas wysyłania wiadomości. Spróbuj ponownie.',
        duration: 8000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-4">
              Skontaktuj się z nami
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Masz pytania dotyczące platformy OpenMind? Chcesz dołączyć jako specjalista? 
              Skontaktuj się z nami - chętnie pomożemy!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informacje kontaktowe */}
            <div className="bg-white border border-slate-200 rounded-lg p-8">
              <h2 className="text-2xl font-medium text-slate-800 mb-6">
                Informacje kontaktowe
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 mb-1">Email</h3>
                    <p className="text-slate-600">kontakt@openmind.pl</p>
                    <p className="text-sm text-slate-500">Odpowiadamy w ciągu 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 mb-1">Telefon</h3>
                    <p className="text-slate-600">+48 123 456 789</p>
                    <p className="text-sm text-slate-500">Pon-Pt: 9:00-17:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 mb-1">Adres</h3>
                    <p className="text-slate-600">
                      ul. Przykładowa 123<br />
                      00-001 Warszawa
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 mb-1">Godziny pracy</h3>
                    <p className="text-slate-600">
                      Poniedziałek - Piątek: 9:00 - 17:00<br />
                      Sobota - Niedziela: Zamknięte
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formularz kontaktowy */}
            <div className="bg-white border border-slate-200 rounded-lg p-8">
              <h2 className="text-2xl font-medium text-slate-800 mb-6">
                Wyślij wiadomość
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
                      Imię
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="form-input w-full"
                      placeholder="Twoje imię"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
                      Nazwisko
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="form-input w-full"
                      placeholder="Twoje nazwisko"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input w-full"
                    placeholder="twoj@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                    Temat
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="appearance-none bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800 transition-all hover:border-slate-400"
                  >
                    <option value="">Wybierz temat</option>
                    <option value="general">Ogólne pytanie</option>
                    <option value="specialist">Chcę dołączyć jako specjalista</option>
                    <option value="technical">Problem techniczny</option>
                    <option value="partnership">Współpraca biznesowa</option>
                    <option value="other">Inne</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                    Wiadomość
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="form-input w-full"
                    placeholder="Opisz swoje pytanie lub sprawę..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-accent w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-white border border-slate-200 rounded-lg p-8">
            <h2 className="text-2xl font-medium text-slate-800 mb-6">
              Często zadawane pytania
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-slate-800 mb-2">
                  Jak mogę dołączyć jako specjalista?
                </h3>
                <p className="text-slate-600 text-sm">
                  Skontaktuj się z nami przez formularz, wybierając temat &ldquo;Chcę dołączyć jako specjalista&rdquo;. 
                  Prześlemy Ci szczegółowe informacje o procesie rejestracji.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-slate-800 mb-2">
                  Czy korzystanie z platformy jest bezpłatne?
                </h3>
                <p className="text-slate-600 text-sm">
                  Tak, przeglądanie specjalistów i kontakt z nimi jest całkowicie bezpłatny. 
                  Płacisz tylko za sesje bezpośrednio specjaliście.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-slate-800 mb-2">
                  Jak działają rezerwacje wizyt?
                </h3>
                <p className="text-slate-600 text-sm">
                  Rezerwacje odbywają się przez zintegrowany system Cal.com. 
                  Po wybraniu specjalisty możesz od razu umówić się na wizytę.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-slate-800 mb-2">
                  Czy moje dane są bezpieczne?
                </h3>
                <p className="text-slate-600 text-sm">
                  Tak, stosujemy najwyższe standardy bezpieczeństwa i ochrony danych osobowych 
                  zgodnie z RODO.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 