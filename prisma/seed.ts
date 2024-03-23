import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function seedDatabase() {
  const passwordRizky = await bcrypt.hash("rizky123", 10)
  const passwordHaksono = await bcrypt.hash("haksono123", 10)

  const user1 = await prisma.user.create({
    data: {
      username: "rizky",
      email: "rizky@gmail.com",
      password: passwordRizky,
    }
  })

  const user2 = await prisma.user.create({
    data: {
      username: "haksono",
      email: "haksono@gmail.com",
      password: passwordHaksono,
    }
  })

  const item1 = await prisma.inventoryItem.create({
    data: {
      name: 'Item 1',
      quantity: 10,
      userId: user1.uuid,
    },
  });

  const item2 = await prisma.inventoryItem.create({
    data: {
      name: 'Item 2',
      quantity: 5,
      userId: user2.uuid,
    },
  });
}

seedDatabase()
  .catch((error) => {
    console.error('Error seeding database:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });