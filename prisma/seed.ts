import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hash } from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const ownerPassword = await hash("password123", 12);
  const bookerPassword = await hash("password123", 12);

  const owner = await prisma.user.upsert({
    where: { email: "owner@example.com" },
    update: {},
    create: {
      name: "Demo Owner",
      email: "owner@example.com",
      passwordHash: ownerPassword,
      role: "OWNER",
    },
  });

  const booker = await prisma.user.upsert({
    where: { email: "booker@example.com" },
    update: {},
    create: {
      name: "Demo Booker",
      email: "booker@example.com",
      passwordHash: bookerPassword,
      role: "BOOKER",
    },
  });

  const rooms = await Promise.all([
    prisma.room.create({
      data: {
        name: "Sunrise Boardroom",
        description:
          "A spacious boardroom with floor-to-ceiling windows and a stunning city view. Perfect for executive meetings and client presentations.",
        location: "Downtown, Floor 12",
        capacity: 12,
        pricePerHour: 75,
        amenities: [
          "Projector",
          "Whiteboard",
          "Video Conferencing",
          "Wi-Fi",
          "Coffee Machine",
        ],
        ownerId: owner.id,
      },
    }),
    prisma.room.create({
      data: {
        name: "The Huddle",
        description:
          "A cozy meeting pod for quick standups and brainstorming sessions. Equipped with a large TV and comfortable seating.",
        location: "Midtown, Floor 3",
        capacity: 4,
        pricePerHour: 25,
        amenities: ["TV Screen", "Whiteboard", "Wi-Fi"],
        ownerId: owner.id,
      },
    }),
    prisma.room.create({
      data: {
        name: "Innovation Lab",
        description:
          "A large, open-concept space designed for workshops and team off-sites. Includes modular furniture and full AV setup.",
        location: "Tech District, Floor 5",
        capacity: 20,
        pricePerHour: 120,
        amenities: [
          "Projector",
          "Video Conferencing",
          "Sound System",
          "Catering Available",
          "Modular Furniture",
        ],
        ownerId: owner.id,
      },
    }),
  ]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  const tomorrowEnd = new Date(tomorrow);
  tomorrowEnd.setHours(12, 0, 0, 0);

  await prisma.booking.create({
    data: {
      roomId: rooms[0].id,
      userId: booker.id,
      startTime: tomorrow,
      endTime: tomorrowEnd,
      status: "CONFIRMED",
      totalPrice: 150,
      notes: "Quarterly planning meeting",
    },
  });

  console.log("Seed complete!");
  console.log(`  Owner: owner@example.com / password123`);
  console.log(`  Booker: booker@example.com / password123`);
  console.log(`  Rooms: ${rooms.length} created`);
  console.log(`  Bookings: 1 created`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
