# OpenMind - Platforma Psychologów MVP

Platforma do rezerwacji wizyt u psychologów, psychiatrów i psychoterapeutów w Polsce.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 + React + TypeScript + Tailwind CSS
- **Backend**: Next.js API routes + Prisma ORM
- **Database**: PostgreSQL (development: SQLite)
- **Authentication**: NextAuth.js
- **Email**: Nodemailer
- **Integration**: Cal.com (booking system)

## 📋 Funkcjonalności

### ✅ Zaimplementowane
- 🏠 **Landing page** z hero section i search
- 👥 **Lista specjalistów** z filtrami i wyszukiwaniem
- 👤 **Profile specjalistów** z szczegółowymi informacjami
- 📅 **Integracja Cal.com** (redirect links)
- 📧 **System kontaktowy** z email notifications
- 🔐 **Panel administracyjny** z autentykacją
- ➕ **CRUD specjalistów** (dodawanie, edycja, usuwanie)
- 📱 **Responsive design** z medical-grade styling

### 🔄 W trakcie rozwoju
- 🔗 **Cal.com API integration** (obecnie redirect)
- 🔍 **SEO optimization**
- 📊 **Analytics i monitoring**

## 🛠️ Setup Development

### 1. Klonowanie i instalacja
```bash
git clone <repository-url>
cd psycholodzy-platform
npm install
```

### 2. Konfiguracja środowiska
Skopiuj `.env.example` do `.env.local` i uzupełnij zmienne:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/psycholodzy_platform"
DIRECT_URL="postgresql://username:password@localhost:5432/psycholodzy_platform"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Admin credentials
ADMIN_EMAIL="admin@psycholodzy-platform.pl"
ADMIN_PASSWORD="admin123"

# Email (Gmail example)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
EMAIL_FROM="noreply@psycholodzy-platform.pl"

# Cal.com
CAL_API_KEY="your-cal-api-key"
CAL_BASE_URL="https://api.cal.com"
```

### 3. Setup bazy danych
```bash
# Generuj Prisma client
npx prisma generate

# Migracja bazy danych
npx prisma db push

# Seed przykładowych danych
npm run seed
```

### 4. Uruchomienie
```bash
npm run dev
```

Aplikacja będzie dostępna na `http://localhost:3000`

## 🔑 Dostęp do panelu admin

- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@psycholodzy-platform.pl`
- **Hasło**: `admin123`

## 📁 Struktura projektu

```
app/
├── api/                    # API endpoints
│   ├── auth/              # NextAuth configuration
│   ├── specialists/       # CRUD specjalistów
│   └── contact/           # Contact form API
├── admin/                 # Panel administracyjny
│   ├── login/            # Strona logowania
│   └── specialists/new/   # Dodawanie specjalisty
├── components/            # Komponenty React
│   ├── layout/           # Header, Footer, Layout
│   ├── specialists/      # SpecialistCard, FilterPanel
│   └── ui/               # Komponenty UI
├── lib/                   # Utilities
│   ├── prisma.ts         # Prisma client
│   └── email.ts          # Email service
├── specjalisci/          # Lista specjalistów
├── specjalista/[slug]/   # Profil specjalisty
└── kontakt/              # Strona kontaktowa
```

## 🎨 Design System

### Kolory
- **Primary**: `#1e293b` (slate-800)
- **Secondary**: `#334155` (slate-700)
- **Accent**: `#0f766e` (teal-700)
- **Background**: `#f8fafc` (slate-50)

### Typography
- **Font**: JetBrains Mono (monospace)
- **Medical-grade spacing** i professional styling

## 📊 Database Schema

### Specialists
```sql
- id, name, email, specialization
- city, address, phone, bio
- pricePerSession, experienceYears
- education, certifications, specializations
- therapyMethods, calUserId
- offersOnline, offersInPerson
- isActive, isVerified
```

### ContactRequests
```sql
- id, specialistId, name, email
- phone, message, createdAt
```

## 🚀 Deployment

### Vercel (Frontend)
```bash
npm run build
vercel --prod
```

### Database
- **Development**: SQLite (dev.db)
- **Production**: PostgreSQL (Supabase/Railway)

### Environment Variables
Ustaw wszystkie zmienne z `.env.example` w Vercel dashboard.

## 📧 Email Configuration

### Gmail Setup
1. Włącz 2FA w Gmail
2. Wygeneruj App Password
3. Użyj App Password jako `SMTP_PASS`

### Inne providery
Dostosuj `SMTP_HOST`, `SMTP_PORT` w `.env.local`

## 🔗 Cal.com Integration

### Obecna implementacja
- Redirect links do Cal.com booking pages
- Format: `cal.com/{calUserId}/consultation`

### Planowana integracja API
- Cal.com API dla dostępności
- Embedded booking widget
- Sync z kalendarzem specjalisty

## 🐛 Troubleshooting

### Database issues
```bash
# Reset bazy danych
npx prisma db push --force-reset
npm run seed
```

### Build errors
```bash
# Sprawdź typy TypeScript
npx tsc --noEmit

# Sprawdź linting
npm run lint
```

### Email nie działa
- Sprawdź SMTP credentials
- Sprawdź czy Gmail App Password jest poprawny
- Sprawdź logi w konsoli

## 📝 TODO

### Krótkoterminowe
- [ ] Cal.com API integration
- [ ] SEO meta tags
- [ ] Image optimization
- [ ] Error boundaries

### Długoterminowe
- [ ] Payment integration
- [ ] Reviews system
- [ ] Advanced search
- [ ] Mobile app

## 🤝 Contributing

1. Fork repository
2. Stwórz feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details.

---

**OpenMind** - Znajdź swojego specjalistę 🧠💚 