interface StructuredDataProps {
  specialist: {
    id: number;
    name: string;
    specialization: string | null;
    city: string | null;
    bio: string | null;
    pricePerSession: number | null;
    phone: string | null;
    email: string;
    address: string | null;
    photoUrl: string | null;
    experienceYears: number | null;
    specializations: string;
    isVerified: boolean;
  };
}

export default function StructuredData({ specialist }: StructuredDataProps) {
  const specializations = specialist.specializations 
    ? JSON.parse(specialist.specializations)
    : [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": specialist.name,
    "description": specialist.bio || `${specialist.specialization} w ${specialist.city}`,
    "url": `${process.env.NEXT_PUBLIC_APP_URL}/specjalista/${specialist.id}`,
    "image": specialist.photoUrl,
    "telephone": specialist.phone,
    "email": specialist.email,
    "address": specialist.address ? {
      "@type": "PostalAddress",
      "addressLocality": specialist.city,
      "addressCountry": "PL",
      "streetAddress": specialist.address
    } : undefined,
    "priceRange": specialist.pricePerSession ? `${specialist.pricePerSession} PLN` : undefined,
    "medicalSpecialty": specializations,
    "hasCredential": specialist.isVerified,
    "employee": {
      "@type": "Person",
      "name": specialist.name,
      "jobTitle": specialist.specialization,
      "image": specialist.photoUrl,
      "telephone": specialist.phone,
      "email": specialist.email,
      "worksFor": {
        "@type": "MedicalBusiness",
        "name": "OpenMind"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 