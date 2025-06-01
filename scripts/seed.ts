import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleSpecialists = [
  {
    name: "Dr Anna Kowalska",
    email: "anna.kowalska@example.com",
    specialization: "Psycholog kliniczny",
    city: "Warszawa",
    bio: "Specjalizuję się w terapii poznawczo-behawioralnej, zaburzeń lękowych i depresji. Prowadzę terapię indywidualną dla dorosłych z 10-letnim doświadczeniem.",
    pricePerSession: 200,
    phone: "+48 123 456 789",
    photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    education: "Uniwersytet Warszawski, Wydział Psychologii, Psychologia kliniczna",
    certifications: "Certyfikat CBT, Certyfikat terapii EMDR",
    specializations: "depresja, lęki, terapia par, zaburzenia osobowości",
    therapyMethods: "CBT, terapia psychodynamiczna, EMDR",
    experienceYears: 10,
    offersOnline: true,
    offersInPerson: true,
    calUserId: "anna-kowalska",
    isActive: true,
    isVerified: true
  },
  {
    name: "Lek. Piotr Nowak",
    email: "piotr.nowak@example.com",
    specialization: "Psychiatra",
    city: "Kraków",
    bio: "Lekarz psychiatra z 15-letnim doświadczeniem w diagnostyce i leczeniu zaburzeń psychicznych. Specjalizuję się w farmakoterapii i zaburzeniach nastroju.",
    pricePerSession: 300,
    phone: "+48 987 654 321",
    photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    education: "Akademia Medyczna w Krakowie, Wydział Lekarski, Specjalizacja psychiatria",
    certifications: "Specjalista psychiatra, Certyfikat farmakoterapii",
    specializations: "zaburzenia nastroju, ADHD, farmakoterapia, zaburzenia psychotyczne",
    therapyMethods: "farmakoterapia, psychoedukacja, terapia wspomagająca",
    experienceYears: 15,
    offersOnline: true,
    offersInPerson: true,
    calUserId: "piotr-nowak",
    isActive: true,
    isVerified: true
  },
  {
    name: "Mgr Maria Wiśniewska",
    email: "maria.wisniewska@example.com",
    specialization: "Psychoterapeuta",
    city: "Gdańsk",
    bio: "Psychoterapeuta systemowy specjalizujący się w terapii par i rodzin. Pomagam w rozwiązywaniu konfliktów i budowaniu lepszej komunikacji.",
    pricePerSession: 180,
    phone: "+48 555 123 456",
    photoUrl: "https://images.unsplash.com/photo-1594824388853-d0c2d4e5b1b5?w=400&h=400&fit=crop&crop=face",
    education: "Uniwersytet Gdański, Psychologia, Psychoterapia systemowa",
    certifications: "Certyfikat psychoterapii systemowej, Certyfikat terapii par",
    specializations: "terapia par, terapia rodzin, problemy komunikacyjne, konflikty",
    therapyMethods: "terapia systemowa, terapia par, terapia rodzin",
    experienceYears: 8,
    offersOnline: true,
    offersInPerson: true,
    calUserId: "maria-wisniewska",
    isActive: true,
    isVerified: true
  },
  {
    name: "Mgr Tomasz Zieliński",
    email: "tomasz.zielinski@example.com",
    specialization: "Psycholog dziecięcy",
    city: "Wrocław",
    bio: "Specjalista w pracy z dziećmi i młodzieżą. Pomagam w radzeniu sobie z problemami emocjonalnymi, trudnościami w nauce oraz problemami behawioralnymi.",
    pricePerSession: 160,
    phone: "+48 777 888 999",
    photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    education: "Uniwersytet Wrocławski, Psychologia dziecięca i rozwojowa",
    certifications: "Certyfikat psychologii dziecięcej, Certyfikat terapii zabawą",
    specializations: "problemy behawioralne, trudności w nauce, lęki dziecięce, ADHD",
    therapyMethods: "terapia zabawą, terapia behawioralna, psychoedukacja",
    experienceYears: 6,
    offersOnline: false,
    offersInPerson: true,
    calUserId: "tomasz-zielinski",
    isActive: true,
    isVerified: true
  },
  {
    name: "Dr Katarzyna Lewandowska",
    email: "katarzyna.lewandowska@example.com",
    specialization: "Psycholog",
    city: "Poznań",
    bio: "Psycholog kliniczny specjalizujący się w terapii traumy i zaburzeń stresowych. Wykorzystuję nowoczesne metody terapeutyczne w pracy z pacjentami.",
    pricePerSession: 220,
    phone: "+48 666 777 888",
    photoUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=face",
    education: "Uniwersytet im. Adama Mickiewicza w Poznaniu, Psychologia kliniczna",
    certifications: "Certyfikat EMDR, Certyfikat terapii traumy, Certyfikat mindfulness",
    specializations: "trauma, PTSD, zaburzenia stresowe, mindfulness",
    therapyMethods: "EMDR, terapia traumy, mindfulness, CBT",
    experienceYears: 12,
    offersOnline: true,
    offersInPerson: true,
    calUserId: "katarzyna-lewandowska",
    isActive: true,
    isVerified: false
  }
]

async function main() {
  console.log('🌱 Rozpoczynam seedowanie bazy danych...')
  
  // Usuń istniejące dane
  await prisma.contactRequest.deleteMany()
  await prisma.specialist.deleteMany()
  console.log('🗑️ Usunięto istniejące dane')
  
  // Dodaj specjalistów
  for (const specialist of sampleSpecialists) {
    const created = await prisma.specialist.create({
      data: specialist
    })
    console.log(`✅ Dodano specjalistę: ${created.name}`)
  }
  
  console.log('🎉 Seedowanie zakończone pomyślnie!')
  console.log(`📊 Dodano ${sampleSpecialists.length} specjalistów`)
}

main()
  .catch((e) => {
    console.error('❌ Błąd podczas seedowania:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 