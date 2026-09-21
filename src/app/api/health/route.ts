import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connectivity
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      service: 'BharatVista API',
      timestamp: new Date().toISOString(),
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown database error'
    return NextResponse.json(
      {
        status: 'error',
        database: 'disconnected',
        message: 'Could not connect to database. Ensure valid Neon DATABASE_URL is set in .env.',
        details: process.env.NODE_ENV === 'development' ? message : undefined,
      },
      { status: 503 }
    )
  }
}

