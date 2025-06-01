# Cursor AI Prompt - Platforma Psychologów MVP

## PROJEKT: Platforma rezerwacji wizyt u psychologów

Zbuduj platformę do rezerwacji wizyt u psychologów/psychiatrów/psychoterapeutów w Polsce, która łączy Cal.com (do rezerwacji) z custom frontend do przeglądania specjalistów.

## TECH STACK
- **Frontend**: Next.js 14 + React + TypeScript + Tailwind CSS
- **Backend**: Next.js API routes + Prisma ORM
- **Database**: PostgreSQL 
- **Integration**: Cal.com API/embedding
- **Auth**: NextAuth.js
- **Deployment**: Vercel (frontend) + Railway/Supabase (database)

## GŁÓWNE FUNKCJONALNOŚCI DO ZBUDOWANIA

### 1. FRONTEND - Landing Page i Lista Specjalistów
```typescript
// Komponenty do stworzenia z Professional Design:
- Header: Clean navigation z monospace logo, subtle borders
  `bg-white border-b border-slate-200 shadow-sm`
- Hero section: Minimalistyczny design z medical-grade typography
  `bg-slate-50 text-slate-900 font-mono`
- FilterPanel: Clean form elements w medical-form style
  `bg-white border border-slate-200 rounded-lg p-6`
- SpecialistGrid: Consistent card spacing, professional shadows
- SpecialistCard: Medical-professional design z:
  * Clean headshot w `rounded-lg border-2 border-slate-200`
  * Name w `text-xl font-medium text-slate-800 tracking-wide`
  * Credentials w `text-sm text-slate-600 font-mono`
  * Specialization badges w `bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-xs font-medium`
  * Location w `text-slate-500 text-sm`
  * Price w professional formatting `text-lg font-semibold text-slate-900`
  * CTA button w medical-accent styling
- Footer: Professional, medical-grade z proper spacing
  `bg-slate-800 text-slate-300 font-mono`
```

### 2. STRONA SPECJALISTY - Szczegółowy Profil
```typescript
// SpecialistProfile page:
- Zdjęcie i pełne dane kontaktowe
- Wykształcenie i certyfikaty
- Specjalizacje (obszary pomocy)
- Metody terapii  
- Doświadczenie zawodowe
- Dostępne terminy (Cal.com embed/integration)
- Formularz kontaktowy
- Mapa lokalizacji gabinetu (jeśli stacjonarnie)
```

### 3. DATABASE SCHEMA
```sql
-- Tabela specialists
CREATE TABLE specialists (
  id SERIAL PRIMARY KEY,
  cal_user_id VARCHAR(255) UNIQUE, -- połączenie z Cal.com
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  specialization VARCHAR(255), -- psycholog/psychiatra/psychoterapeuta
  photo_url VARCHAR(255),
  bio TEXT,
  price_per_session INTEGER, -- cena w PLN
  city VARCHAR(100),
  address TEXT,
  phone VARCHAR(20),
  
  -- Szczegóły zawodowe
  education TEXT,
  certifications TEXT[],
  specializations TEXT[], -- obszary pomocy
  therapy_methods TEXT[],
  experience_years INTEGER,
  
  -- Typy wizyt
  offers_online BOOLEAN DEFAULT false,
  offers_in_person BOOLEAN DEFAULT false,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela contact_requests (opcjonalnie)
CREATE TABLE contact_requests (
  id SERIAL PRIMARY KEY,
  specialist_id INTEGER REFERENCES specialists(id),
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. API ENDPOINTS
```typescript
// API routes do stworzenia:
/api/specialists/
  - GET: lista specjalistów z filtrami
  - POST: dodaj nowego specjalistę (admin)

/api/specialists/[id]
  - GET: szczegóły specjalisty
  - PUT: aktualizuj specjalistę (admin)
  - DELETE: usuń specjalistę (admin)

/api/search
  - GET: wyszukiwanie specjalistów (nazwa, miasto, specjalizacja)

/api/contact
  - POST: wyślij zapytanie do specjalisty

/api/cal-integration
  - GET: pobierz dostępność z Cal.com
  - POST: sync Cal.com data
```

### 5. CAL.COM INTEGRATION
```typescript
// Sposoby integracji z Cal.com:
1. **Embed approach**: 
   - Cal.com booking widget embedded na stronie specjalisty
   - Każdy specjalista ma swój Cal.com account
   
2. **API approach**:
   - Używanie Cal.com API do pokazywania dostępności
   - Custom booking flow z przekierowaniem do Cal.com
   
3. **Hybrid approach** (RECOMMENDED):
   - Lista specjalistów to custom frontend
   - Kliknięcie "Umów wizytę" → redirect do Cal.com booking page
   - URL format: cal.com/specialist-name/consultation
```

## KONKRETNE STRONY DO ZBUDOWANIA

### Strona główna ("/")
- Hero section z search bar
- Krótki opis platformy
- Popularne kategorie (psycholog, psychiatra, terapeuta)
- Jak to działa (3 kroki)
- CTA do przeglądania specjalistów

### Lista specjalistów ("/specjalisci")  
- Filtry w sidebar
- Grid z kartami specjalistów
- Pagination
- Sorting (cena, lokalizacja, ocena)

### Profil specjalisty ("/specjalista/[slug]")
- Pełne informacje o specjaliście
- Cal.com booking integration
- Formularz kontaktowy
- Mapa (jeśli stacjonarnie)

### Panel administracyjny ("/admin") - BASIC
- Lista specjalistów
- Dodawanie/edycja specjalistów
- Zarządzanie zapytaniami kontaktowymi
- Basic statistics

## DESIGN GUIDELINES

### Paleta kolorów - Professional Trust Theme
- **Primary**: #1e293b (slate-800 - głęboki grafit, solidność, profesjonalizm)
- **Secondary**: #334155 (slate-700 - ciemny szary, elegancja)
- **Accent**: #0f766e (teal-700 - spokojny teal, zaufanie medyczne)
- **Success**: #15803d (green-700 - bezpieczeństwo, certyfikacja)
- **Background**: #f8fafc (slate-50 - czyste, sterylne tło)
- **Card backgrounds**: #ffffff (pure white - czystość, przejrzystość)
- **Text primary**: #0f172a (slate-900 - maksymalna czytelność)
- **Text secondary**: #475569 (slate-600 - subtle secondary text)
- **Borders**: #e2e8f0 (slate-200 - delikatne obramowania)

### Typography - Monospace Professional
- **Font Family**: 
  ```css
  font-family: 'JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 
               'Roboto Mono', 'Source Code Pro', monospace;
  ```
- **Headings**: 
  - H1: `text-4xl font-semibold tracking-tight text-slate-900`
  - H2: `text-3xl font-medium tracking-tight text-slate-800`  
  - H3: `text-2xl font-medium text-slate-800`
  - H4: `text-xl font-medium text-slate-700`
- **Body Text**: 
  - Primary: `text-base font-normal text-slate-600 leading-relaxed`
  - Small: `text-sm font-normal text-slate-500`
- **Buttons**: `font-medium tracking-wide uppercase text-sm`
- **Cards**: `bg-white shadow-sm border border-slate-200 rounded-lg`
- **Professional spacing**: Generous padding and margins for medical-grade clarity

### Responsive Design - Professional Medical Interface
- **Mobile-first approach** z medical-grade accessibility
- **Breakpoints**: sm, md, lg, xl z konsekwentnym spacing
- **Grid**: 1 kolumna (mobile) → 2 kolumny (tablet) → 3-4 kolumny (desktop)
- **Cards**: Elevated design z subtle shadows i clean borders
- **Buttons**: 
  - Primary: `bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-md tracking-wide transition-colors`
  - Secondary: `bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-medium py-3 px-6 rounded-md tracking-wide transition-colors`
  - Accent: `bg-teal-700 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-md tracking-wide transition-colors`
- **Input fields**: Clean, medical-form style z focus states
  ```css
  bg-white border border-slate-300 rounded-md px-4 py-3 
  focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent
  font-mono text-slate-800
  ```

### Professional Trust Elements
- **Certifications badges**: Subtle green accent z `bg-green-50 text-green-800 border border-green-200`
- **Verified specialists**: Checkmark icon w `text-teal-700`
- **Professional credentials**: Displayed prominently w monospace
- **Clean data presentation**: Tables i lists z consistent spacing
- **Medical-grade whitespace**: Generous padding for readability and trust

## PRZYKŁADOWE DANE DO SEEDOWANIA

```typescript
const sampleSpecialists = [
  {
    name: "Dr Anna Kowalska",
    specialization: "Psycholog kliniczny",
    city: "Warszawa",
    price_per_session: 200,
    bio: "Specjalista w zakresie terapii poznawczo-behawioralnej...",
    specializations: ["depresja", "lęki", "terapia par"],
    offers_online: true,
    offers_in_person: true,
    cal_user_id: "anna-kowalska"
  },
  {
    name: "Lek. Piotr Nowak",
    specialization: "Psychiatra",
    city: "Kraków", 
    price_per_session: 300,
    bio: "Lekarz psychiatra z 15-letnim doświadczeniem...",
    specializations: ["zaburzenia nastroju", "ADHD", "farmakoterapia"],
    offers_online: true,
    offers_in_person: true,
    cal_user_id: "piotr-nowak"
  }
];
```

## DEPLOYMENT PLAN

### Environment Variables (.env.local)
```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# Cal.com Integration  
CAL_API_KEY="..."
CAL_BASE_URL="https://api.cal.com"

# Email (ContactForm)
SMTP_HOST="..."
SMTP_PORT="..."
SMTP_USER="..."
SMTP_PASS="..."
```

### Production Setup
1. **Frontend**: Deploy to Vercel
2. **Database**: Supabase PostgreSQL lub Railway
3. **Domain**: Custom domain setup
4. **SSL**: Automatic via Vercel
5. **Cal.com**: Self-hosted instance lub hosted service

## PRIORITIES - MVP FEATURES

### Phase 1 (Tygodnie 1-2) - CORE ✅ UKOŃCZONE
- [x] Next.js setup z TypeScript + Tailwind
- [x] Database schema + Prisma setup
- [x] Homepage z hero section
- [x] Lista specjalistów (basic grid)
- [x] SpecialistCard component

### Phase 2 (Tygodnie 3-4) - FEATURES ✅ UKOŃCZONE
- [x] Filtry i wyszukiwanie
- [x] Strona szczegółów specjalisty
- [x] Cal.com integration (redirect lub embed)
- [x] Responsive design
- [x] Basic admin panel

### Phase 3 (Tygodnie 5-6) - POLISH ✅ UKOŃCZONE
- [x] Formularz kontaktowy
- [x] Email notifications
- [x] SEO optimization
- [x] Performance optimization
- [x] Testing + bug fixes

### Phase 4 (NOWE) - ADMIN & MANAGEMENT ✅ UKOŃCZONE
- [x] NextAuth.js authentication
- [x] Admin login page
- [x] Admin dashboard z statystykami
- [x] CRUD operations dla specjalistów
- [x] Email service z nodemailer
- [x] Contact form z email notifications
- [x] Professional admin interface

## DODATKOWE WSKAZÓWKI

### SEO Requirements
- Dynamic meta tags per specialist
- Structured data (JSON-LD) for specialists
- Sitemap generation  
- Polish language content

### Performance
- Image optimization (next/image)
- Lazy loading dla specialist cards
- Database indexing (city, specialization)
- Caching dla API responses

### Security
- Input validation (Zod schemas)
- Rate limiting dla contact form
- CSRF protection
- Sanitization user inputs

---

## STARTER COMMAND

Po otrzymaniu tego promptu, zacznij od:

1. **Stworzenia nowego Next.js projektu**:
```bash
npx create-next-app@latest psycholodzy-platform --typescript --tailwind --eslint --app
```

### 2. **Frontend Dependencies Setup**:
```bash
npm install prisma @prisma/client next-auth @next-auth/prisma-adapter zod react-hook-form @hookform/resolvers @next/font lucide-react clsx tailwind-merge
```

### 3. **Tailwind Config dla Monospace i Custom Colors**:
```javascript
// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['JetBrains Mono', ...fontFamily.mono],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', ...fontFamily.mono],
      },
      colors: {
        medical: {
          primary: '#1e293b',    // slate-800
          secondary: '#334155',  // slate-700  
          accent: '#0f766e',     // teal-700
          success: '#15803d',    // green-700
          background: '#f8fafc', // slate-50
        }
      },
      letterSpacing: {
        'medical': '0.025em',
      }
    },
  },
  plugins: [],
};
```

3. **Setupu podstawowej struktury folderów i pierwszych komponentów**

Zaczynaj od Phase 1 i pytaj o szczegóły gdy potrzebujesz clarification!