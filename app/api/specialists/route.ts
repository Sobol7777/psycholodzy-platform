import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// Force dynamic rendering - nie prerenderuj podczas build
export const dynamic = 'force-dynamic';

// Przykładowe dane specjalistów
const sampleSpecialists = [
  {
    id: 1,
    name: "Dr Anna Kowalska",
    specialization: "Psycholog kliniczny",
    city: "Warszawa",
    experience: "10 lat doświadczenia w terapii poznawczo-behawioralnej",
    description: "Specjalizuję się w terapii zaburzeń lękowych, depresji oraz problemów związanych ze stresem. Prowadzę terapię indywidualną dla dorosłych.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    calComLink: "https://cal.com/anna-kowalska",
    phone: "+48 123 456 789",
    email: "anna.kowalska@example.com"
  },
  {
    id: 2,
    name: "Mgr Piotr Nowak",
    specialization: "Psychoterapeuta",
    city: "Kraków",
    experience: "8 lat doświadczenia w terapii par i rodzin",
    description: "Pomagam parom i rodzinom w rozwiązywaniu konfliktów oraz budowaniu lepszej komunikacji. Prowadzę również terapię indywidualną.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    calComLink: "https://cal.com/piotr-nowak",
    phone: "+48 987 654 321",
    email: "piotr.nowak@example.com"
  },
  {
    id: 3,
    name: "Dr Maria Wiśniewska",
    specialization: "Psychiatra",
    city: "Gdańsk",
    experience: "15 lat doświadczenia w psychiatrii",
    description: "Specjalizuję się w diagnostyce i leczeniu zaburzeń psychicznych. Prowadzę konsultacje psychiatryczne oraz farmakoterapię.",
    image: "https://images.unsplash.com/photo-1594824388853-d0c2d4e5b1b5?w=400&h=400&fit=crop&crop=face",
    calComLink: "https://cal.com/maria-wisniewska",
    phone: "+48 555 123 456",
    email: "maria.wisniewska@example.com"
  },
  {
    id: 4,
    name: "Mgr Tomasz Zieliński",
    specialization: "Psycholog dziecięcy",
    city: "Wrocław",
    experience: "6 lat doświadczenia w pracy z dziećmi",
    description: "Pracuję z dziećmi i młodzieżą, pomagając w radzeniu sobie z problemami emocjonalnymi, trudnościami w nauce oraz problemami behawioralnymi.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    calComLink: "https://cal.com/tomasz-zielinski",
    phone: "+48 777 888 999",
    email: "tomasz.zielinski@example.com"
  }
];

// GET /api/specialists - pobierz wszystkich specjalistów
export async function GET(request: NextRequest) {
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
    console.error('Błąd podczas pobierania specjalistów:', error);
    return NextResponse.json(
      { error: 'Failed to fetch specialists' },
      { status: 500 }
    );
  }
}

// POST /api/specialists - dodaj nowego specjalistę (tylko dla admina)
export async function POST(request: NextRequest) {
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