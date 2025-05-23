import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

// Force dynamic rendering - nie prerenderuj podczas build
export const dynamic = 'force-dynamic';

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
    const specialist = await prisma.specialist.findUnique({
      where: { id: data.specialistId },
    });
    
    if (!specialist) {
      return NextResponse.json(
        { error: 'Specialist not found' },
        { status: 404 }
      );
    }
    
    // Zapisz zapytanie kontaktowe
    const contactRequest = await prisma.contactRequest.create({
      data,
    });
    
    // W prawdziwej aplikacji tutaj wysłalibyśmy email do specjalisty
    // np. przez Nodemailer, SendGrid lub podobny serwis
    
    return NextResponse.json(
      { message: 'Contact request sent successfully', id: contactRequest.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error sending contact request:', error);
    return NextResponse.json(
      { error: 'Failed to send contact request' },
      { status: 500 }
    );
  }
}

// GET method for build time compatibility
export async function GET() {
  return NextResponse.json({ message: 'Contact API endpoint' });
}