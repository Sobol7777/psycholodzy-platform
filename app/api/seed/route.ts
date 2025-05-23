import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const specialists = [
  {
    name: "Dr Anna Kowalska",
    email: "anna.kowalska@example.com",
    specialization: "Psycholog kliniczny",
    bio: "Specjalista w zakresie terapii poznawczo-behawioralnej z 10-letnim doświadczeniem. Pomagam w radzeniu sobie z depresją, lękami i problemami w relacjach.",
    pricePerSession: 200,
    city: "Warszawa",
    address: "ul. Marszałkowska 15/3, 00-624 Warszawa",
    phone: "+48 123 456 789",
    education: "Psychologia kliniczna, Uniwersytet Warszawski (2010)",
    certifications: "Certyfikat CBT, Certyfikat terapii par",
    specializations: "depresja, lęki, terapia par",
    therapyMethods: "CBT, terapia systemowa",
    experienceYears: 10,
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "dr-anna-kowalska"
  },
  {
    name: "Lek. Piotr Nowak",
    email: "piotr.nowak@example.com",
    specialization: "Psychiatra",
    bio: "Lekarz psychiatra z 15-letnim doświadczeniem w diagnostyce i leczeniu zaburzeń psychicznych. Specjalizuję się w farmakoterapii i leczeniu zaburzeń nastroju.",
    pricePerSession: 300,
    city: "Kraków",
    address: "ul. Floriańska 25/12, 31-019 Kraków",
    phone: "+48 987 654 321",
    education: "Medycyna, Uniwersytet Jagielloński (2005), Specjalizacja psychiatria (2010)",
    certifications: "Specjalista psychiatra, Certyfikat farmakoterapii",
    specializations: "zaburzenia nastroju, ADHD, farmakoterapia",
    therapyMethods: "farmakoterapia, psychoedukacja",
    experienceYears: 15,
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "lek-piotr-nowak"
  },
  {
    name: "Mgr Joanna Wiśniewska",
    email: "joanna.wisniewska@example.com",
    specialization: "Psychoterapeuta",
    bio: "Psychoterapeuta z 8-letnim doświadczeniem w pracy z traumami i zaburzeniami osobowości. Prowadzę terapię długoterminową metodą psychodynamiczną.",
    pricePerSession: 180,
    city: "Wrocław",
    address: "ul. Świdnicka 30/5, 50-068 Wrocław",
    phone: "+48 555 123 456",
    education: "Psychologia, Uniwersytet Wrocławski (2012), Szkolenie psychoterapeutyczne (2016)",
    certifications: "Certyfikat psychoterapeuty, Szkolenie w terapii traumy",
    specializations: "traumy, zaburzenia osobowości, nerwice",
    therapyMethods: "terapia psychodynamiczna, terapia traumy",
    experienceYears: 8,
    offersOnline: true,
    offersInPerson: false,
    isActive: true,
    isVerified: false,
    calUserId: "mgr-joanna-wisniewska"
  }
]

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

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: "Przykładowe dane specjalistów",
      specialists: sampleSpecialists,
      count: sampleSpecialists.length
    });
  } catch (error) {
    console.error('Błąd podczas pobierania danych:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Błąd podczas pobierania danych",
        details: error instanceof Error ? error.message : 'Nieznany błąd'
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    // Symulujemy dodanie danych do bazy
    return NextResponse.json({
      success: true,
      message: "Przykładowe dane zostały przygotowane",
      added: sampleSpecialists.length,
      specialists: sampleSpecialists
    });
  } catch (error) {
    console.error('Błąd podczas dodawania danych:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Błąd podczas dodawania danych",
        details: error instanceof Error ? error.message : 'Nieznany błąd'
      },
      { status: 500 }
    );
  }
} 