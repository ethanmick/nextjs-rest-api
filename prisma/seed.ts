import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('test', 12)
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Test User',
      password
    }
  })
  console.log({ user })

  const restaurant = await prisma.restaurant.createMany({
    data: [
      {
        name: "Ocean's Catch",
        address: '23 Pacific Drive, Marlinville, OP 56789',
        description:
          'An exquisite seafood restaurant offering a wide variety of freshly caught fish and shellfish, prepared to perfection by our master chefs.'
      },
      {
        name: "Mamma Mia's",
        address: '105 Piazza Lane, Little Italy, LT 23456',
        description:
          'A cozy family-owned Italian eatery, serving authentic homemade pasta, pizza, and other traditional dishes, accompanied by a fine selection of Italian wines.'
      },
      {
        name: 'Sizzling Samurai',
        address: '456 Bamboo Street, Cherry Blossom, CB 89012',
        description:
          'A modern Japanese steakhouse featuring mouth-watering teppanyaki dishes, expertly prepared by our skillful chefs right at your table.'
      },
      {
        name: 'The Green Leaf',
        address: '12 Verdant Crescent, Sunshine Valley, SV 12345',
        description:
          'A health-conscious vegetarian and vegan haven, offering a diverse menu of delicious plant-based dishes, made with locally-sourced and organic ingredients.'
      },
      {
        name: 'Casa de Tapas',
        address: '67 Flamenco Way, Andalusia Heights, AH 67890',
        description:
          'A vibrant Spanish tapas bar with a lively atmosphere, featuring a wide array of small plates, refreshing sangria, and live Flamenco performances on weekends.'
      },
      {
        name: 'Spice Bazaar',
        address: '32 Silk Road, Currytown, CT 54321',
        description:
          'An authentic Indian dining experience, offering a wide range of mouth-watering curries, tandoori dishes, and exotic desserts, all served in a warm and inviting ambiance.'
      },
      {
        name: 'Boulangerie Bistro',
        address: '89 Rue des Croissants, Petite Paris, PP 34567',
        description:
          'A charming French bistro and bakery, offering classic Parisian fare, freshly baked bread and pastries, and an extensive list of regional wines.'
      }
    ]
  })

  console.log('Created restaurants:', restaurant.count)

  const menus = await prisma.menu.createMany({
    data: [
      {
        name: 'Breakfast',
        description:
          'A delightful assortment of morning favorites, ranging from fluffy pancakes and waffles to savory omelets and hearty breakfast sandwiches.',
        restaurantId: 1
      },
      {
        name: 'Lunch',
        description:
          'A diverse selection of midday dishes, including satisfying sandwiches, refreshing salads, and daily soup specials to fuel your afternoon.',
        restaurantId: 1
      },
      {
        name: 'Dinner',
        description:
          'An array of delectable evening options, featuring mouth-watering entrees, expertly prepared sides, and indulgent desserts to end your day on a high note.',
        restaurantId: 1
      }
    ]
  })
  console.log('Created menus:', menus.count)
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
