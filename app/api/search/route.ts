import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// GET /api/search - wyszukiwanie specjalistów
export async function GET(request: NextRequest) {
  // Sprawdź czy to build time - jeśli tak, zwróć mock response
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    return NextResponse.json([]);
  }

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    // Wyszukiwanie po nazwie, mieście lub specjalizacji
    // Używamy LIKE zamiast contains dla kompatybilności z SQLite i PostgreSQL
    const specialists = await prisma.specialist.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: query } },
          { city: { contains: query } },
          { specialization: { contains: query } },
          { specializations: { contains: query } },
        ],
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    return NextResponse.json(specialists);
  } catch (error) {
    console.error('Error searching specialists:', error);
    return NextResponse.json(
      { error: 'Failed to search specialists' },
      { status: 500 }
    );
  }
}