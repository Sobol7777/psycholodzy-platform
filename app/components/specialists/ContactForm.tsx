'use client';

import React, { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle } from 'lucide-react';

interface ContactFormProps {
  specialistId: number;
  specialistName: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = ({ specialistId, specialistName }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          specialistId,
          ...formData
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Wystąpił błąd podczas wysyłania wiadomości');
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
          <h3 className="text-xl font-medium text-slate-800 mb-2">
            Wiadomość wysłana!
          </h3>
          <p className="text-slate-600 mb-4">
            Twoja wiadomość została pomyślnie wysłana do {specialistName}. 
            Specjalista skontaktuje się z Tobą w ciągu 24-48 godzin.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="bg-teal-700 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Wyślij kolejną wiadomość
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h3 className="text-xl font-medium text-slate-800 mb-4">
        Wyślij wiadomość do {specialistName}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Imię i nazwisko *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="pl-10 w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
              placeholder="Twoje imię i nazwisko"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-10 w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
              placeholder="twoj@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
            Telefon (opcjonalnie)
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="pl-10 w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
              placeholder="+48 123 456 789"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
            Wiadomość *
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-slate-400 h-5 w-5" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="pl-10 w-full bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
              placeholder="Opisz swoje potrzeby, pytania lub sprawę, z którą chciałbyś się skontaktować..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-400 text-white font-medium py-3 px-6 rounded-md tracking-wide transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Wysyłanie...
            </>
          ) : (
            <>
              <Send size={18} />
              Wyślij wiadomość
            </>
          )}
        </button>
      </form>

      <div className="mt-4 p-3 bg-slate-50 rounded-md">
        <p className="text-sm text-slate-600">
          💡 <strong>Wskazówka:</strong> Opisz dokładnie swoją sytuację i oczekiwania. 
          Im więcej informacji podasz, tym lepiej specjalista będzie mógł Ci pomóc.
        </p>
      </div>
    </div>
  );
};

export default ContactForm; 