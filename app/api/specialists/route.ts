import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Force dynamic rendering - nie prerenderuj podczas build
export const dynamic = 'force-dynamic';

// GET /api/specialists - pobierz wszystkich specjalistów
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const specialization = searchParams.get('specialization');
    const search = searchParams.get('search');

    const where: Prisma.SpecialistWhereInput = {
      isActive: true
    };

    if (city) {
      where.city = {
        contains: city
      };
    }

    if (specialization) {
      where.specialization = {
        contains: specialization
      };
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: search
          }
        },
        {
          specialization: {
            contains: search
          }
        },
        {
          city: {
            contains: search
          }
        }
      ];
    }

    const specialists = await prisma.specialist.findMany({
      where,
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(specialists);
  } catch (error) {
    console.error('Błąd podczas pobierania specjalistów:', error);
    return NextResponse.json(
      { error: 'Failed to fetch specialists' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST /api/specialists - dodaj nowego specjalistę (tylko dla admina)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const specialist = await prisma.specialist.create({
      data: {
        name: body.name,
        email: body.email,
        specialization: body.specialization,
        city: body.city,
        bio: body.bio,
        pricePerSession: body.pricePerSession,
        phone: body.phone,
        photoUrl: body.photoUrl,
        education: body.education,
        certifications: body.certifications || '',
        specializations: body.specializations || '',
        therapyMethods: body.therapyMethods || '',
        experienceYears: body.experienceYears,
        offersOnline: body.offersOnline || false,
        offersInPerson: body.offersInPerson || false,
        calUserId: body.calUserId
      }
    });

    return NextResponse.json(specialist, { status: 201 });
  } catch (error) {
    console.error('Error creating specialist:', error);
    return NextResponse.json(
      { error: 'Failed to create specialist' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}