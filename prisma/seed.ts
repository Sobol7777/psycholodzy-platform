import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Usuń istniejące dane (jeśli tabele istnieją)
  try {
    await prisma.contactRequest.deleteMany()
    console.log('Usunięto istniejące zapytania kontaktowe')
  } catch (error) {
    console.log('Tabela contact_requests nie istnieje lub jest pusta')
  }
  
  try {
    await prisma.specialist.deleteMany()
    console.log('Usunięto istniejących specjalistów')
  } catch (error) {
    console.log('Tabela specialists nie istnieje lub jest pusta')
  }

  // Dodaj przykładowych specjalistów
  const specialist1 = await prisma.specialist.create({
    data: {
      name: "Dr Anna Kowalska",
      email: "anna.kowalska@example.com",
      specialization: "Psycholog kliniczny",
      city: "Warszawa",
      pricePerSession: 200,
      bio: "Specjalista w zakresie terapii poznawczo-behawioralnej z 10-letnim doświadczeniem. Pomagam w radzeniu sobie z depresją, lękami i problemami w relacjach.",
      specializations: JSON.stringify(["depresja", "lęki", "terapia par"]),
      therapyMethods: JSON.stringify(["CBT", "terapia systemowa", "mindfulness"]),
      experienceYears: 10,
      education: "Psychologia kliniczna, Uniwersytet Warszawski",
      certifications: JSON.stringify(["Certyfikat CBT", "Terapia par"]),
      offersOnline: true,
      offersInPerson: true,
      isActive: true,
      isVerified: true,
      calUserId: "anna-kowalska",
      photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
    }
  })

  const specialist2 = await prisma.specialist.create({
    data: {
      name: "Lek. Piotr Nowak",
      email: "piotr.nowak@example.com",
      specialization: "Psychiatra",
      city: "Kraków",
      pricePerSession: 300,
      bio: "Lekarz psychiatra z 15-letnim doświadczeniem w leczeniu zaburzeń nastroju, ADHD i zaburzeń lękowych. Specjalizuję się w farmakoterapii i psychoedukacji.",
      specializations: JSON.stringify(["zaburzenia nastroju", "ADHD", "farmakoterapia"]),
      therapyMethods: JSON.stringify(["farmakoterapia", "psychoedukacja", "terapia wspierająca"]),
      experienceYears: 15,
      education: "Medycyna, Uniwersytet Jagielloński; Specjalizacja psychiatria",
      certifications: JSON.stringify(["Specjalista psychiatra", "Certyfikat ADHD"]),
      offersOnline: true,
      offersInPerson: true,
      isActive: true,
      isVerified: true,
      calUserId: "piotr-nowak",
      photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
    }
  })

  const specialist3 = await prisma.specialist.create({
    data: {
      name: "Mgr Katarzyna Wiśniewska",
      email: "katarzyna.wisniewska@example.com",
      specialization: "Psychoterapeuta",
      city: "Wrocław",
      pricePerSession: 180,
      bio: "Psychoterapeuta specjalizująca się w terapii gestalt i pracy z traumą. Pomagam osobom w procesie radzenia sobie z trudnymi doświadczeniami życiowymi.",
      specializations: JSON.stringify(["trauma", "terapia gestalt", "rozwój osobisty"]),
      therapyMethods: JSON.stringify(["terapia gestalt", "EMDR", "terapia somatyczna"]),
      experienceYears: 8,
      education: "Psychologia, Uniwersytet Wrocławski; Szkolenie w terapii gestalt",
      certifications: JSON.stringify(["Certyfikat terapii gestalt", "EMDR Level 1"]),
      offersOnline: true,
      offersInPerson: true,
      isActive: true,
      isVerified: true,
      calUserId: "katarzyna-wisniewska",
      photoUrl: "https://images.unsplash.com/photo-1594824804732-ca8db7531fae?w=400&h=400&fit=crop&crop=face"
    }
  })

  const specialist4 = await prisma.specialist.create({
    data: {
      name: "Dr Marcin Zieliński",
      email: "marcin.zielinski@example.com",
      specialization: "Psycholog",
      city: "Gdańsk",
      pricePerSession: 220,
      bio: "Psycholog specjalizujący się w terapii rodzin i par. Pomagam w rozwiązywaniu konfliktów, poprawie komunikacji i budowaniu zdrowych relacji.",
      specializations: JSON.stringify(["terapia rodzin", "terapia par", "komunikacja"]),
      therapyMethods: JSON.stringify(["terapia systemowa", "terapia Gottmana", "NVC"]),
      experienceYears: 12,
      education: "Psychologia rodziny, Uniwersytet Gdański",
      certifications: JSON.stringify(["Terapia systemowa", "Metoda Gottmana"]),
      offersOnline: false,
      offersInPerson: true,
      isActive: true,
      isVerified: true,
      calUserId: "marcin-zielinski",
      photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face"
    }
  })

  const specialist5 = await prisma.specialist.create({
    data: {
      name: "Mgr Agnieszka Kowalczyk",
      email: "agnieszka.kowalczyk@example.com",
      specialization: "Psycholog",
      city: "Poznań",
      pricePerSession: 160,
      bio: "Młoda, energiczna psycholog specjalizująca się w pracy z młodzieżą i młodymi dorosłymi. Pomagam w radzeniu sobie ze stresem, problemami w nauce i relacjach rówieśniczymi.",
      specializations: JSON.stringify(["psychologia młodzieży", "stres", "problemy szkolne"]),
      therapyMethods: JSON.stringify(["CBT", "terapia krótkoterminowa", "coaching"]),
      experienceYears: 5,
      education: "Psychologia, Uniwersytet im. Adama Mickiewicza w Poznaniu",
      certifications: JSON.stringify(["CBT dla młodzieży", "Coaching młodzieżowy"]),
      offersOnline: true,
      offersInPerson: true,
      isActive: true,
      isVerified: false,
      calUserId: "agnieszka-kowalczyk",
      photoUrl: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face"
    }
  })

  console.log(`Dodano 5 specjalistów`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }) 