import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Force dynamic rendering - nie prerenderuj podczas build
export const dynamic = 'force-dynamic';

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
    
    // Utwórz zapytanie kontaktowe
    const contactRequest = await prisma.contactRequest.create({
      data: {
        specialistId: validatedData.specialistId,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || '',
        message: validatedData.message
      }
    });
    
    return NextResponse.json({
      message: 'Zapytanie kontaktowe zostało wysłane pomyślnie',
      id: contactRequest.id
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Nieprawidłowe dane', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Błąd podczas tworzenia zapytania kontaktowego:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas wysyłania zapytania' },
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