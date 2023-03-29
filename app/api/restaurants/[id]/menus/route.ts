import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const menus = await prisma.menu.findMany({
    where: {
      restaurantId: Number(params.id)
    }
  })
  return NextResponse.json(menus)
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const json = await request.json()

  const created = await prisma.menu.create({
    data: {
      ...json,
      restaurantId: Number(params.id)
    }
  })

  return new NextResponse(JSON.stringify(created), { status: 201 })
}
