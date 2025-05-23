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
    
    return NextResponse.json({ 
      success: true, 
      message: 'Połączenie z bazą danych działa',
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