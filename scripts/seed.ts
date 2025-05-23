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

async function main() {
  console.log('🌱 Seedowanie bazy danych...')
  
  // Usuń istniejące dane
  await prisma.specialist.deleteMany()
  console.log('🗑️ Usunięto istniejące dane')
  
  // Dodaj nowych specjalistów
  for (const specialist of specialists) {
    const created = await prisma.specialist.create({
      data: specialist
    })
    console.log(`✅ Dodano: ${created.name}`)
  }
  
  console.log('🎉 Seedowanie zakończone!')
}

main()
  .catch((e) => {
    console.error('❌ Błąd podczas seedowania:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 