import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET /api/specialists/[id] - pobierz specjalistę po ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Sprawdź czy to build time - jeśli tak, zwróć mock response
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    return NextResponse.json({ id: 1, name: 'Mock Specialist' });
  }

  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    const specialist = await prisma.specialist.findUnique({
      where: { id },
    });
    
    if (!specialist) {
      return NextResponse.json(
        { error: 'Specialist not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(specialist);
  } catch (error) {
    console.error('Error fetching specialist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch specialist' },
      { status: 500 }
    );
  }
}

// PUT /api/specialists/[id] - aktualizuj specjalistę (tylko admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Sprawdź czy to build time - jeśli tak, zwróć mock response
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: 'Service temporarily unavailable' },
      { status: 503 }
    );
  }

  try {
    // W prawdziwej aplikacji dodalibyśmy sprawdzanie autoryzacji dla admina
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    const specialist = await prisma.specialist.update({
      where: { id },
      data: body,
    });
    
    return NextResponse.json(specialist);
  } catch (error) {
    console.error('Error updating specialist:', error);
    return NextResponse.json(
      { error: 'Failed to update specialist' },
      { status: 500 }
    );
  }
}

// DELETE /api/specialists/[id] - usuń specjalistę (tylko admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Sprawdź czy to build time - jeśli tak, zwróć mock response
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: 'Service temporarily unavailable' },
      { status: 503 }
    );
  }

  try {
    // W prawdziwej aplikacji dodalibyśmy sprawdzanie autoryzacji dla admina
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    await prisma.specialist.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Specialist deleted successfully' });
  } catch (error) {
    console.error('Error deleting specialist:', error);
    return NextResponse.json(
      { error: 'Failed to delete specialist' },
      { status: 500 }
    );
  }
}