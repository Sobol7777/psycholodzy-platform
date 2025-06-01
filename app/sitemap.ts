import { MetadataRoute } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  // Pobierz wszystkich aktywnych specjalistów
  const specialists = await prisma.specialist.findMany({
    where: { isActive: true },
    select: { id: true, updatedAt: true }
  });

  // Statyczne strony
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/specjalisci`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Dynamiczne strony specjalistów
  const specialistPages = specialists.map((specialist) => ({
    url: `${baseUrl}/specjalista/${specialist.id}`,
    lastModified: specialist.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...specialistPages];
} 