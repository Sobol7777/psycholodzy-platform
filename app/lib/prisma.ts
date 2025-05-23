import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Sprawdź czy DATABASE_URL jest dostępne
if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL not found, Prisma client may not work properly');
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma; 