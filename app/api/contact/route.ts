import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { sendContactEmail } from '../../lib/email';
import { rateLimit, rateLimitConfigs } from '../../lib/rateLimit';

const prisma = new PrismaClient();

// Force dynamic rendering - nie prerenderuj podczas build
export const dynamic = 'force-dynamic';

// Rate limiting
const contactRateLimit = rateLimit(rateLimitConfigs.contact);

// Schemat walidacji dla zapytania kontaktowego
const contactRequestSchema = z.object({
  specialistId: z.number().int().positive(),
  name: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  email: z.string().email('Nieprawidłowy adres email'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Wiadomość musi mieć co najmniej 10 znaków')
});

// POST /api/contact - wyślij zapytanie kontaktowe
export async function POST(request: NextRequest) {
  try {
    // Sprawdź rate limiting
    const rateLimitResult = contactRateLimit(request);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Zbyt wiele requestów. Spróbuj ponownie później.',
          retryAfter: rateLimitResult.reset
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      );
    }
    
    const body = await request.json();
    
    // Walidacja danych
    const validatedData = contactRequestSchema.parse(body);
    
    // Sprawdź czy specjalista istnieje
    const specialist = await prisma.specialist.findUnique({
      where: { id: validatedData.specialistId }
    });
    
    if (!specialist) {
      return NextResponse.json(
        { error: 'Specjalista nie został znaleziony' },
        { status: 404 }
      );
    }
    
    // Utwórz zapytanie kontaktowe w bazie danych
    const contactRequest = await prisma.contactRequest.create({
      data: {
        specialistId: validatedData.specialistId,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || '',
        message: validatedData.message
      }
    });
    
    // Wyślij email do specjalisty i pacjenta
    if (specialist.email) {
      const emailResult = await sendContactEmail({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        specialistName: specialist.name,
        specialistEmail: specialist.email
      });
      
      if (!emailResult.success) {
        console.error('Failed to send email:', emailResult.error);
        // Nie zwracamy błędu - zapytanie zostało zapisane w bazie
      }
    }
    
    return NextResponse.json({
      message: 'Zapytanie kontaktowe zostało wysłane pomyślnie',
      id: contactRequest.id
    }, {
      headers: {
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.reset.toString(),
      }
    });
    
  } catch (error) {
    console.error('Contact API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Nieprawidłowe dane', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// GET method for compatibility with build time
export async function GET() {
  return NextResponse.json({ message: 'Contact API endpoint' });
}