import { NextRequest, NextResponse } from 'next/server';

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

// Force dynamic rendering - nie prerenderuj podczas build
export const dynamic = 'force-dynamic';

// GET /api/search - wyszukiwanie specjalistów
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const city = searchParams.get('city')?.toLowerCase() || '';
    const specialization = searchParams.get('specialization')?.toLowerCase() || '';

    // Filtruj specjalistów na podstawie kryteriów wyszukiwania
    let filteredSpecialists = sampleSpecialists;

    if (query) {
      filteredSpecialists = filteredSpecialists.filter(specialist =>
        specialist.name.toLowerCase().includes(query) ||
        specialist.description.toLowerCase().includes(query) ||
        specialist.specialization.toLowerCase().includes(query)
      );
    }

    if (city) {
      filteredSpecialists = filteredSpecialists.filter(specialist =>
        specialist.city.toLowerCase().includes(city)
      );
    }

    if (specialization) {
      filteredSpecialists = filteredSpecialists.filter(specialist =>
        specialist.specialization.toLowerCase().includes(specialization)
      );
    }

    return NextResponse.json(filteredSpecialists);
  } catch (error) {
    console.error('Błąd podczas wyszukiwania:', error);
    return NextResponse.json(
      { error: 'Błąd podczas wyszukiwania specjalistów' },
      { status: 500 }
    );
  }
}