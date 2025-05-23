import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST() {
  try {
    console.log('🔄 Uruchamianie migracji bazy danych...')
    
    // Test połączenia z bazą danych
    await prisma.$connect()
    console.log('✅ Połączono z bazą danych')
    
    // Sprawdź czy tabele istnieją
    const result = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('specialists', 'contact_requests')
    `
    
    console.log('📋 Istniejące tabele:', result)
    
    // Jeśli tabele nie istnieją, utwórz je
    if (Array.isArray(result) && result.length === 0) {
      console.log('🔨 Tworzenie tabel...')
      
      // Utwórz tabelę specialists
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS specialists (
          id SERIAL PRIMARY KEY,
          cal_user_id VARCHAR(255) UNIQUE,
          email VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          specialization VARCHAR(255),
          photo_url VARCHAR(255),
          bio TEXT,
          price_per_session INTEGER,
          city VARCHAR(100),
          address TEXT,
          phone VARCHAR(20),
          education TEXT,
          certifications TEXT,
          specializations TEXT,
          therapy_methods TEXT,
          experience_years INTEGER,
          offers_online BOOLEAN DEFAULT false,
          offers_in_person BOOLEAN DEFAULT false,
          is_active BOOLEAN DEFAULT true,
          is_verified BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `
      
      // Utwórz tabelę contact_requests
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS contact_requests (
          id SERIAL PRIMARY KEY,
          specialist_id INTEGER REFERENCES specialists(id),
          name VARCHAR(255),
          email VARCHAR(255),
          phone VARCHAR(20),
          message TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `
      
      console.log('✅ Tabele utworzone')
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Migracja zakończona pomyślnie',
      tables: result
    })
  } catch (error) {
    console.error('❌ Błąd połączenia z bazą danych:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Błąd połączenia z bazą danych',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 