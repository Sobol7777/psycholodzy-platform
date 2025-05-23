import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Force dynamic rendering - nie prerenderuj podczas build
export const dynamic = 'force-dynamic';

// Przykładowe dane specjalistów dla walidacji
const sampleSpecialists = [
  { id: 1, name: "Dr Anna Kowalska" },
  { id: 2, name: "Mgr Piotr Nowak" },
  { id: 3, name: "Dr Maria Wiśniewska" },
  { id: 4, name: "Mgr Tomasz Zieliński" }
];

// Schemat walidacji dla zapytania kontaktowego
const contactRequestSchema = z.object({
  specialistId: z.number().int().positive(),
  name: z.string().min(1, 'Imię i nazwisko jest wymagane'),
  email: z.string().email('Podaj poprawny adres email'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Wiadomość musi zawierać co najmniej 10 znaków'),
});

// POST /api/contact - wyślij zapytanie kontaktowe
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Walidacja danych
    const validationResult = contactRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;
    
    // Sprawdź czy specjalista istnieje
    const specialist = sampleSpecialists.find(s => s.id === data.specialistId);
    
    if (!specialist) {
      return NextResponse.json(
        { error: 'Specialist not found' },
        { status: 404 }
      );
    }
    
    // Symulujemy zapisanie zapytania kontaktowego
    const contactRequest = {
      id: Math.floor(Math.random() * 10000),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    console.log('Nowe zapytanie kontaktowe:', contactRequest);
    
    // W prawdziwej aplikacji tutaj wysłalibyśmy email do specjalisty
    // np. przez Nodemailer, SendGrid lub podobny serwis
    
    return NextResponse.json(
      { message: 'Zapytanie kontaktowe zostało wysłane pomyślnie', id: contactRequest.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Błąd podczas wysyłania zapytania kontaktowego:', error);
    return NextResponse.json(
      { error: 'Nie udało się wysłać zapytania kontaktowego' },
      { status: 500 }
    );
  }
}

// GET method for build time compatibility
export async function GET() {
  return NextResponse.json({ message: 'Contact API endpoint' });
}