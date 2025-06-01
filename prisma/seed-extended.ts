import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Rozszerzona lista specjalistów dla demo
const specialists = [
  // Warszawa (8 specjalistów)
  {
    name: "Dr Anna Kowalska",
    email: "anna.kowalska@openmind.pl",
    specialization: "Psycholog kliniczny",
    city: "Warszawa",
    address: "ul. Marszałkowska 100/10, 00-001 Warszawa",
    pricePerSession: 250,
    bio: "Specjalista w zakresie terapii poznawczo-behawioralnej z 12-letnim doświadczeniem. Pomagam w radzeniu sobie z depresją, lękami i problemami w relacjach. Prowadzę terapię w języku polskim i angielskim.",
    specializations: ["depresja", "zaburzenia lękowe", "terapia par", "wypalenie zawodowe"],
    therapyMethods: ["CBT", "terapia systemowa", "mindfulness", "MBSR"],
    experienceYears: 12,
    education: "Doktor psychologii klinicznej, Uniwersytet Warszawski",
    certifications: ["Certyfikat CBT", "Terapia par EFT", "Supervisor PTP"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "anna-kowalska-warszawa",
    photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Lek. Piotr Nowak",
    email: "piotr.nowak@openmind.pl",
    specialization: "Psychiatra",
    city: "Warszawa",
    address: "ul. Nowy Świat 50, 00-001 Warszawa",
    pricePerSession: 350,
    bio: "Lekarz psychiatra z 15-letnim doświadczeniem w leczeniu zaburzeń afektywnych, ADHD i zaburzeń osobowości. Łączę farmakoterapię z psychoedukacją dla najlepszych efektów leczenia.",
    specializations: ["zaburzenia afektywne", "ADHD", "zaburzenia osobowości", "schizofrenia"],
    therapyMethods: ["farmakoterapia", "psychoedukacja", "terapia poznawcza", "konsultacje"],
    experienceYears: 15,
    education: "Specjalista psychiatra, Warszawski Uniwersytet Medyczny",
    certifications: ["Specjalista psychiatra", "Certyfikat ADHD u dorosłych", "Psychoterapia poznawcza"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "piotr-nowak-psychiatra",
    photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Mgr Katarzyna Lewandowska",
    email: "katarzyna.lewandowska@openmind.pl",
    specialization: "Psychoterapeuta",
    city: "Warszawa",
    address: "ul. Mokotowska 55/3, 00-001 Warszawa",
    pricePerSession: 200,
    bio: "Certyfikowana psychoterapeutka psychodynamiczna. Specjalizuję się w pracy z traumą rozwojową, zaburzeniami więzi i problemami tożsamości.",
    specializations: ["trauma rozwojowa", "zaburzenia więzi", "problemy tożsamości", "borderline"],
    therapyMethods: ["psychoterapia psychodynamiczna", "terapia schematu", "EMDR"],
    experienceYears: 10,
    education: "Psychologia kliniczna, SWPS; Szkoła Psychoterapii Psychodynamicznej",
    certifications: ["Certyfikat psychoterapeuty PTP", "EMDR Europe", "Terapia schematu"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "katarzyna-lewandowska",
    photoUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Dr hab. Marek Wiśniewski",
    email: "marek.wisniewski@openmind.pl",
    specialization: "Psycholog kliniczny",
    city: "Warszawa",
    address: "ul. Puławska 120, 00-001 Warszawa",
    pricePerSession: 300,
    bio: "Profesor psychologii klinicznej, specjalista neuropsycholog. Diagnoza i terapia zaburzeń neuropsychologicznych, rehabilitacja poznawcza.",
    specializations: ["neuropsychologia", "zaburzenia poznawcze", "rehabilitacja", "diagnostyka"],
    therapyMethods: ["neuropsychologia kliniczna", "rehabilitacja poznawcza", "biofeedback"],
    experienceYears: 20,
    education: "Habilitacja z psychologii, Uniwersytet Warszawski",
    certifications: ["Neuropsycholog kliniczny", "EEG Biofeedback", "Diagnostyka psychologiczna"],
    offersOnline: false,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "marek-wisniewski-prof",
    photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face"
  },
  
  // Kraków (6 specjalistów)
  {
    name: "Dr Małgorzata Zielińska",
    email: "malgorzata.zielinska@openmind.pl",
    specialization: "Psycholog",
    city: "Kraków",
    address: "ul. Karmelicka 45, 31-131 Kraków",
    pricePerSession: 220,
    bio: "Psycholog z doświadczeniem w terapii dzieci i młodzieży. Specjalizuję się w zaburzeniach emocjonalnych, ADHD i spektrum autyzmu.",
    specializations: ["psychologia dziecięca", "ADHD", "spektrum autyzmu", "zaburzenia emocjonalne"],
    therapyMethods: ["terapia poznawczo-behawioralna", "terapia przez zabawę", "trening umiejętności społecznych"],
    experienceYears: 14,
    education: "Doktor psychologii rozwojowej, Uniwersytet Jagielloński",
    certifications: ["Psycholog dziecięcy", "Diagnoza autyzmu ADOS-2", "Terapia dzieci z ADHD"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "malgorzata-zielinska",
    photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Lek. Tomasz Kowalczyk",
    email: "tomasz.kowalczyk@openmind.pl",
    specialization: "Psychiatra",
    city: "Kraków",
    address: "ul. Długa 10, 31-147 Kraków",
    pricePerSession: 300,
    bio: "Psychiatra z 10-letnim doświadczeniem, specjalizacja w zaburzeniach nastroju i psychozach. Holistyczne podejście do pacjenta.",
    specializations: ["zaburzenia nastroju", "psychozy", "zaburzenia snu", "uzależnienia"],
    therapyMethods: ["farmakoterapia", "psychoterapia integracyjna", "mindfulness"],
    experienceYears: 10,
    education: "Specjalista psychiatra, Collegium Medicum UJ",
    certifications: ["Specjalista psychiatra", "Psychoterapia integracyjna", "Leczenie uzależnień"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "tomasz-kowalczyk-psychiatra",
    photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
  },
  
  // Wrocław (5 specjalistów)
  {
    name: "Mgr Agnieszka Pawlak",
    email: "agnieszka.pawlak@openmind.pl",
    specialization: "Psychoterapeuta",
    city: "Wrocław",
    address: "ul. Świdnicka 22, 50-001 Wrocław",
    pricePerSession: 180,
    bio: "Psychoterapeutka Gestalt z 8-letnim doświadczeniem. Wspieram w kryzysach życiowych, problemach relacyjnych i rozwoju osobistym.",
    specializations: ["kryzys życiowy", "problemy relacyjne", "rozwój osobisty", "żałoba"],
    therapyMethods: ["terapia Gestalt", "terapia systemowa", "arteterapia"],
    experienceYears: 8,
    education: "Psychologia, Uniwersytet Wrocławski; Szkoła Psychoterapii Gestalt",
    certifications: ["Certyfikat psychoterapeuty Gestalt", "Arteterapia", "Terapia systemowa"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "agnieszka-pawlak",
    photoUrl: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Dr Robert Jankowski",
    email: "robert.jankowski@openmind.pl",
    specialization: "Psycholog kliniczny",
    city: "Wrocław",
    address: "pl. Grunwaldzki 15, 50-001 Wrocław",
    pricePerSession: 240,
    bio: "Specjalista terapii par i seksuolog kliniczny. Pomagam parom w kryzysie oraz osobom z problemami seksualnymi.",
    specializations: ["terapia par", "seksuologia", "problemy intymności", "zdrada"],
    therapyMethods: ["terapia par EFT", "terapia Gottmana", "terapia seksuologiczna"],
    experienceYears: 16,
    education: "Doktor psychologii, Uniwersytet Wrocławski; Seksuologia kliniczna",
    certifications: ["Seksuolog kliniczny", "Terapeuta par EFT", "Metoda Gottmana"],
    offersOnline: false,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "robert-jankowski",
    photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face"
  },
  
  // Gdańsk (4 specjalistów)
  {
    name: "Mgr Monika Kwiatkowska",
    email: "monika.kwiatkowska@openmind.pl",
    specialization: "Psycholog",
    city: "Gdańsk",
    address: "ul. Długa 45, 80-001 Gdańsk",
    pricePerSession: 190,
    bio: "Psycholog sportu i psychodietetyk. Wspieram sportowców oraz osoby z zaburzeniami odżywiania.",
    specializations: ["psychologia sportu", "zaburzenia odżywiania", "motywacja", "perfekcjonizm"],
    therapyMethods: ["CBT", "trening mentalny", "psychodietetyka", "mindful eating"],
    experienceYears: 7,
    education: "Psychologia sportu, AWFiS Gdańsk; Psychodietetyka",
    certifications: ["Psycholog sportu", "Psychodietetyk", "Mindful eating"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "monika-kwiatkowska",
    photoUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Lek. Krzysztof Adamski",
    email: "krzysztof.adamski@openmind.pl",
    specialization: "Psychiatra",
    city: "Gdańsk",
    address: "ul. Grunwaldzka 100, 80-001 Gdańsk",
    pricePerSession: 320,
    bio: "Psychiatra dziecięcy z 12-letnim doświadczeniem. Specjalizuję się w ADHD, autyzmie i zaburzeniach nastroju u dzieci.",
    specializations: ["psychiatria dziecięca", "ADHD", "autyzm", "zaburzenia nastroju u dzieci"],
    therapyMethods: ["farmakoterapia", "terapia rodzinna", "psychoedukacja rodziców"],
    experienceYears: 12,
    education: "Specjalista psychiatra dzieci i młodzieży, GUMed",
    certifications: ["Psychiatra dziecięcy", "ADOS-2", "Terapia rodzin"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "krzysztof-adamski",
    photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
  },
  
  // Poznań (3 specjalistów)
  {
    name: "Dr Beata Mazur",
    email: "beata.mazur@openmind.pl",
    specialization: "Psycholog kliniczny",
    city: "Poznań",
    address: "ul. Święty Marcin 50, 61-001 Poznań",
    pricePerSession: 230,
    bio: "Psycholog kliniczny, specjalista psychotraumatologii. Terapia PTSD, traumy złożonej i dysocjacji.",
    specializations: ["PTSD", "trauma złożona", "dysocjacja", "przemoc"],
    therapyMethods: ["EMDR", "terapia sensomotoryczna", "IFS", "stabilizacja"],
    experienceYears: 18,
    education: "Doktor psychologii klinicznej, UAM Poznań",
    certifications: ["EMDR Europe", "Terapia sensomotoryczna", "IFS Level 2", "Psychotraumatologia"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "beata-mazur",
    photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Mgr Paweł Kaczmarek",
    email: "pawel.kaczmarek@openmind.pl",
    specialization: "Psychoterapeuta",
    city: "Poznań",
    address: "ul. Półwiejska 10, 61-001 Poznań",
    pricePerSession: 170,
    bio: "Terapeuta uzależnień i specjalista terapii grupowej. Prowadzę grupy wsparcia i terapię indywidualną.",
    specializations: ["uzależnienia", "współuzależnienie", "terapia grupowa", "nawroty"],
    therapyMethods: ["terapia uzależnień", "terapia grupowa", "TSR", "mindfulness w uzależnieniach"],
    experienceYears: 9,
    education: "Psychoterapia uzależnień, Instytut Psychologii Zdrowia",
    certifications: ["Specjalista terapii uzależnień", "Terapeuta grupowy", "TSR"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "pawel-kaczmarek",
    photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face"
  },
  
  // Łódź (3 specjalistów)
  {
    name: "Mgr Joanna Sikora",
    email: "joanna.sikora@openmind.pl",
    specialization: "Psycholog",
    city: "Łódź",
    address: "ul. Piotrkowska 150, 90-001 Łódź",
    pricePerSession: 160,
    bio: "Psycholog szkolny i terapeuta dzieci. Wspieram dzieci z trudnościami szkolnymi, ADHD i zaburzeniami zachowania.",
    specializations: ["psychologia szkolna", "trudności w nauce", "ADHD", "zaburzenia zachowania"],
    therapyMethods: ["terapia behawioralna", "trening umiejętności", "terapia przez zabawę"],
    experienceYears: 6,
    education: "Psychologia, Uniwersytet Łódzki",
    certifications: ["Psycholog szkolny", "Terapia dzieci z ADHD", "Bajkoterapia"],
    offersOnline: false,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "joanna-sikora",
    photoUrl: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Dr Adam Nowicki",
    email: "adam.nowicki@openmind.pl",
    specialization: "Psycholog kliniczny",
    city: "Łódź",
    address: "ul. Narutowicza 30, 90-001 Łódź",
    pricePerSession: 210,
    bio: "Specjalista terapii uzależnień behawioralnych - hazard, gry komputerowe, zakupoholizm. Terapia CBT.",
    specializations: ["uzależnienia behawioralne", "hazard", "gry komputerowe", "zakupoholizm"],
    therapyMethods: ["CBT", "terapia motywująca", "terapia akceptacji i zaangażowania"],
    experienceYears: 11,
    education: "Doktor psychologii klinicznej, Uniwersytet Łódzki",
    certifications: ["CBT", "Terapia uzależnień behawioralnych", "ACT"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "adam-nowicki",
    photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
  },
  
  // Katowice (2 specjalistów)
  {
    name: "Mgr Ewa Kowalczyk",
    email: "ewa.kowalczyk@openmind.pl",
    specialization: "Psychoterapeuta",
    city: "Katowice",
    address: "ul. Mariacka 20, 40-001 Katowice",
    pricePerSession: 190,
    bio: "Psychoterapeutka psychodynamiczna, specjalistka pracy z osobowością borderline i zaburzeniami nastroju.",
    specializations: ["borderline", "zaburzenia nastroju", "autoagresja", "zaburzenia osobowości"],
    therapyMethods: ["psychoterapia psychodynamiczna", "MBT", "DBT skills"],
    experienceYears: 13,
    education: "Psychologia, Uniwersytet Śląski; Szkoła Psychoterapii",
    certifications: ["Psychoterapeuta PTP", "MBT Basic", "DBT Skills"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "ewa-kowalczyk",
    photoUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Lek. Michał Zawadzki",
    email: "michal.zawadzki@openmind.pl",
    specialization: "Psychiatra",
    city: "Katowice",
    address: "ul. Warszawska 15, 40-001 Katowice",
    pricePerSession: 280,
    bio: "Psychiatra, specjalista leczenia depresji lekoopornej i zaburzeń dwubiegunowych. Stosuje nowoczesne metody leczenia.",
    specializations: ["depresja lekooporna", "choroba afektywna dwubiegunowa", "TMS", "ketamina"],
    therapyMethods: ["farmakoterapia", "TMS", "terapia ketaminowa", "psychoedukacja"],
    experienceYears: 8,
    education: "Specjalista psychiatra, Śląski Uniwersytet Medyczny",
    certifications: ["Specjalista psychiatra", "TMS", "Terapia ketaminowa"],
    offersOnline: false,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "michal-zawadzki",
    photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
  },
  
  // Lublin (2 specjalistów)
  {
    name: "Dr Magdalena Wójcik",
    email: "magdalena.wojcik@openmind.pl",
    specialization: "Psycholog kliniczny",
    city: "Lublin",
    address: "ul. Krakowskie Przedmieście 50, 20-001 Lublin",
    pricePerSession: 200,
    bio: "Psycholog kliniczny z doświadczeniem w psychoonkologii. Wspieram pacjentów onkologicznych i ich rodziny.",
    specializations: ["psychoonkologia", "wsparcie w chorobie", "żałoba", "lęk przed śmiercią"],
    therapyMethods: ["terapia wspierająca", "ACT", "mindfulness", "terapia egzystencjalna"],
    experienceYears: 15,
    education: "Doktor psychologii klinicznej, UMCS Lublin",
    certifications: ["Psychoonkologia", "ACT", "Mindfulness w medycynie"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "magdalena-wojcik",
    photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Mgr Rafał Kowalski",
    email: "rafal.kowalski@openmind.pl",
    specialization: "Psychoterapeuta",
    city: "Lublin",
    address: "ul. Narutowicza 25, 20-001 Lublin",
    pricePerSession: 170,
    bio: "Terapeuta poznawczo-behawioralny, specjalista fobii i zaburzeń obsesyjno-kompulsywnych.",
    specializations: ["fobie", "OCD", "agorafobia", "napady paniki"],
    therapyMethods: ["CBT", "terapia ekspozycyjna", "ACT", "interwencje behawioralne"],
    experienceYears: 7,
    education: "Psychologia, KUL; Szkoła Terapii CBT",
    certifications: ["Terapeuta CBT", "Terapia zaburzeń lękowych", "ACT"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "rafal-kowalski",
    photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face"
  },
  
  // Szczecin (1 specjalista)
  {
    name: "Dr Iwona Kamińska",
    email: "iwona.kaminska@openmind.pl",
    specialization: "Psycholog kliniczny",
    city: "Szczecin",
    address: "al. Papieża Jana Pawła II 30, 70-001 Szczecin",
    pricePerSession: 220,
    bio: "Psycholog kliniczny, specjalistka psychologii perinatalnej. Wspieram kobiety w ciąży, po porodzie oraz w problemach z płodnością.",
    specializations: ["psychologia perinatalna", "depresja poporodowa", "niepłodność", "żałoba perinatalna"],
    therapyMethods: ["terapia wspierająca", "EMDR", "mindfulness dla matek", "terapia par"],
    experienceYears: 10,
    education: "Doktor psychologii, Uniwersytet Szczeciński",
    certifications: ["Psychologia perinatalna", "EMDR", "Terapia traumy porodowej"],
    offersOnline: true,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "iwona-kaminska",
    photoUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face"
  },
  
  // Białystok (1 specjalista)
  {
    name: "Mgr Andrzej Dąbrowski",
    email: "andrzej.dabrowski@openmind.pl",
    specialization: "Psychoterapeuta",
    city: "Białystok",
    address: "ul. Lipowa 20, 15-001 Białystok",
    pricePerSession: 180,
    bio: "Terapeuta integracyjny z doświadczeniem w pracy z mężczyznami. Specjalizuję się w kryzysie męskości, problemach ojcostwa.",
    specializations: ["kryzys męskości", "problemy ojcostwa", "przemoc", "uzależnienia"],
    therapyMethods: ["terapia integracyjna", "terapia grupowa dla mężczyzn", "praca z gniewem"],
    experienceYears: 9,
    education: "Psychologia, Uniwersytet w Białymstoku",
    certifications: ["Psychoterapeuta integracyjny", "Terapia grupowa", "Praca z przemocą"],
    offersOnline: false,
    offersInPerson: true,
    isActive: true,
    isVerified: true,
    calUserId: "andrzej-dabrowski",
    photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face"
  },
  
  // Online only (3 specjalistów)
  {
    name: "Dr Natalia Pietrzak",
    email: "natalia.pietrzak@openmind.pl",
    specialization: "Psycholog kliniczny",
    city: "Online",
    address: "Tylko konsultacje online",
    pricePerSession: 200,
    bio: "Psycholog kliniczny, specjalistka terapii online. Pracuję z Polakami mieszkającymi za granicą oraz osobami preferującymi terapię zdalną.",
    specializations: ["adaptacja kulturowa", "tęsknota za domem", "stres akulturacyjny", "kryzys tożsamości"],
    therapyMethods: ["CBT online", "terapia integracyjna", "coaching psychologiczny"],
    experienceYears: 8,
    education: "Doktor psychologii, SWPS",
    certifications: ["Terapia online", "CBT", "Coaching ICF"],
    offersOnline: true,
    offersInPerson: false,
    isActive: true,
    isVerified: true,
    calUserId: "natalia-pietrzak-online",
    photoUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Mgr Kamil Nowak",
    email: "kamil.nowak@openmind.pl",
    specialization: "Psychoterapeuta",
    city: "Online",
    address: "Tylko konsultacje online",
    pricePerSession: 150,
    bio: "Specjalista e-terapii, pracuję z osobami z fobią społeczną, którym łatwiej rozpocząć terapię online.",
    specializations: ["fobia społeczna", "lęk społeczny", "nieśmiałość", "agorafobia"],
    therapyMethods: ["CBT online", "terapia ekspozycyjna VR", "Social skills training"],
    experienceYears: 5,
    education: "Psychologia, Uniwersytet SWPS",
    certifications: ["E-terapia", "CBT", "VR w terapii"],
    offersOnline: true,
    offersInPerson: false,
    isActive: true,
    isVerified: true,
    calUserId: "kamil-nowak-online",
    photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Dr Aleksandra Nowicka",
    email: "aleksandra.nowicka@openmind.pl",
    specialization: "Psycholog kliniczny",
    city: "Online",
    address: "Tylko konsultacje online",
    pricePerSession: 250,
    bio: "Psycholog kliniczny, specjalistka terapii dla osób LGBTQ+. Tworzę bezpieczną przestrzeń dla różnorodności.",
    specializations: ["LGBTQ+", "dysforia płciowa", "coming out", "minority stress"],
    therapyMethods: ["terapia afirmatywna", "terapia systemowa", "mindfulness"],
    experienceYears: 12,
    education: "Doktor psychologii klinicznej, Uniwersytet Warszawski",
    certifications: ["Terapia afirmatywna LGBTQ+", "Sexology", "Gender Studies"],
    offersOnline: true,
    offersInPerson: false,
    isActive: true,
    isVerified: true,
    calUserId: "aleksandra-nowicka",
    photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  }
];

async function main() {
  // Usuń istniejące dane
  await prisma.contactRequest.deleteMany();
  await prisma.specialist.deleteMany();
  
  console.log('🗑️  Usunięto istniejące dane');

  // Dodaj specjalistów
  for (const specialist of specialists) {
    const created = await prisma.specialist.create({
      data: {
        ...specialist,
        specializations: JSON.stringify(specialist.specializations),
        therapyMethods: JSON.stringify(specialist.therapyMethods),
        certifications: JSON.stringify(specialist.certifications),
      }
    });
    console.log(`✅ Dodano: ${created.name} (${created.city})`);
  }

  console.log(`\n🎉 Sukces! Dodano ${specialists.length} specjalistów do bazy danych.`);
  
  // Podsumowanie
  const cities = Array.from(new Set(specialists.map(s => s.city)));
  console.log(`\n📊 Podsumowanie:`);
  console.log(`   - Miasta: ${cities.join(', ')}`);
  console.log(`   - Specjalizacje: Psycholog, Psychiatra, Psychoterapeuta`);
  console.log(`   - Ceny: ${Math.min(...specialists.map(s => s.pricePerSession))} - ${Math.max(...specialists.map(s => s.pricePerSession))} PLN`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Błąd:', e);
    await prisma.$disconnect();
    process.exit(1);
  }); 