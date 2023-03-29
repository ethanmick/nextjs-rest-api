import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params: { id, menuId } }: { params: { id: string; menuId: string } }
) {
  const restaurant = await prisma.menu.findFirst({
    where: {
      id: Number(menuId),
      restaurantId: Number(id)
    }
  })
  return NextResponse.json(restaurant)
}

export async function PUT(
  request: Request,
  { params: { menuId } }: { params: { id: string; menuId: string } }
) {
  const json = await request.json()
  const updated = await prisma.menu.update({
    where: {
      id: parseInt(menuId, 10)
    },
    data: {
      name: json.name || null,
      description: json.description || null
    }
  })

  return NextResponse.json(updated)
}

export async function PATCH(
  request: Request,
  { params: { menuId } }: { params: { id: string; menuId: string } }
) {
  const json = await request.json()
  const updated = await prisma.menu.update({
    where: {
      id: Number(menuId)
    },
    data: json
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  request: Request,
  { params: { menuId } }: { params: { id: string; menuId: string } }
) {
  const deleted = await prisma.menu.delete({
    where: {
      id: Number(menuId)
    }
  })

  return NextResponse.json(deleted)
}
