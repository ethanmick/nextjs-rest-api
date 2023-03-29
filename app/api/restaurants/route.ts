import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const skip = request.nextUrl.searchParams.get('skip')
  const take = request.nextUrl.searchParams.get('take')
  const restaurants = await prisma.restaurant.findMany({
    skip: skip ? parseInt(skip, 10) : undefined,
    take: take ? parseInt(take, 10) : undefined
  })
  return NextResponse.json(restaurants)
}

export async function POST(request: Request) {
  const json = await request.json()

  const created = await prisma.restaurant.create({
    data: json
  })

  return new NextResponse(JSON.stringify(created), { status: 201 })
}
