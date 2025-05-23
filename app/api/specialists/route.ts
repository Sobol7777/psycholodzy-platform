import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// GET /api/specialists - pobierz wszystkich specjalistów
export async function GET(request: NextRequest) {
  // Sprawdź czy to build time - jeśli tak, zwróć mock response
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    return NextResponse.json([]);
  }

  try {
    const { searchParams } = new URL(request.url);
    
    // Parametry filtrowania
    const specialization = searchParams.get('specialization');
    const city = searchParams.get('city');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const offersOnline = searchParams.get('offersOnline');
    const offersInPerson = searchParams.get('offersInPerson');
    
    // Buduj zapytanie z filtrami
    const where: any = {
      isActive: true, // Tylko aktywni specjaliści
    };
    
    // Zastosuj filtry jeśli są podane
    if (specialization) {
      where.specialization = specialization;
    }
    
    if (city) {
      where.city = city;
    }
    
    if (minPrice) {
      where.pricePerSession = {
        ...where.pricePerSession,
        gte: parseInt(minPrice),
      };
    }
    
    if (maxPrice) {
      where.pricePerSession = {
        ...where.pricePerSession,
        lte: parseInt(maxPrice),
      };
    }
    
    if (offersOnline === 'true') {
      where.offersOnline = true;
    }
    
    if (offersInPerson === 'true') {
      where.offersInPerson = true;
    }
    
    const specialists = await prisma.specialist.findMany({
      where,
      orderBy: {
        name: 'asc', // Domyślne sortowanie
      },
    });
    
    return NextResponse.json(specialists);
  } catch (error) {
    console.error('Error fetching specialists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch specialists' },
      { status: 500 }
    );
  }
}

// POST /api/specialists - dodaj nowego specjalistę (tylko dla admina)
export async function POST(request: NextRequest) {
  // Sprawdź czy to build time - jeśli tak, zwróć mock response
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: 'Service temporarily unavailable' },
      { status: 503 }
    );
  }

  try {
    // W prawdziwej aplikacji dodalibyśmy sprawdzanie autoryzacji dla admina
    const body = await request.json();
    
    const specialist = await prisma.specialist.create({
      data: body,
    });
    
    return NextResponse.json(specialist, { status: 201 });
  } catch (error) {
    console.error('Error creating specialist:', error);
    return NextResponse.json(
      { error: 'Failed to create specialist' },
      { status: 500 }
    );
  }
}