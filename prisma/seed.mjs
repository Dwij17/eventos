import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting MongoDB Seeding for EventOS...");

  // 1. Create or update Admin User
  const adminPasswordHash = await bcrypt.hash("Admin@12345", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@eventos.com" },
    update: {},
    create: {
      email: "admin@eventos.com",
      firstName: "Alex",
      lastName: "Vance",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });
  console.log("✅ Admin user ready:", admin.email);

  // 2. Create or update Organizer User (Dwij Patel)
  const organizerPasswordHash = "$2b$12$MbXvj/jMb0Ki6lYzdHDxEOJV7ymGoK/RsvMO/TTgaLivtxfNe.P8e"; // User's registered hash
  const organizerUser = await prisma.user.upsert({
    where: { email: "dwijpatel1000@gmail.com" },
    update: {},
    create: {
      email: "dwijpatel1000@gmail.com",
      firstName: "Dwij",
      lastName: "Patel",
      passwordHash: organizerPasswordHash,
      role: "ORGANIZER",
      status: "ACTIVE",
    },
  });
  console.log("✅ Organizer user ready:", organizerUser.email);

  // 3. Create Organizer Profile
  let organizer = await prisma.organizer.findUnique({
    where: { userId: organizerUser.id },
  });

  if (!organizer) {
    organizer = await prisma.organizer.create({
      data: {
        userId: organizerUser.id,
        orgName: "EventOS Apex Productions",
        slug: "eventos-apex",
        description: "Official event organizer of premier marathons, tournaments and cultural fests.",
        verified: true,
        status: "APPROVED",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
      },
    });
  }
  console.log("✅ Organizer profile ready:", organizer.orgName);

  // 4. Create or update Participant User
  const participantPasswordHash = await bcrypt.hash("Participant@12345", 10);
  const participant = await prisma.user.upsert({
    where: { email: "participant@eventos.com" },
    update: {},
    create: {
      email: "participant@eventos.com",
      firstName: "Priya",
      lastName: "Sharma",
      passwordHash: participantPasswordHash,
      role: "PARTICIPANT",
      status: "ACTIVE",
    },
  });
  console.log("✅ Participant user ready:", participant.email);

  // 5. Seed Events
  const eventsData = [
    {
      title: "Mumbai Marathon 2027",
      slug: "mumbai-marathon-2027",
      shortDescription: "Asia's premier marathon running experience through the iconic streets of Mumbai.",
      description: "Join thousands of runners in the biggest endurance race in India. Featuring a scenic route from CST across the Bandra-Worli Sea Link.",
      type: "RUNNING",
      status: "PUBLISHED",
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80",
      startDate: new Date("2027-01-15T06:00:00Z"),
      endDate: new Date("2027-01-15T14:00:00Z"),
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      venueName: "Chhatrapati Shivaji Maharaj Terminus",
      tags: ["marathon", "running", "fitness", "mumbai"],
      categories: [
        { name: "Full Marathon", price: 2500, distance: 42.2, capacity: 5000, registeredCount: 120 },
        { name: "Half Marathon", price: 1500, distance: 21.1, capacity: 8000, registeredCount: 350 },
        { name: "10K Run", price: 800, distance: 10, capacity: 10000, registeredCount: 500 },
      ],
    },
    {
      title: "IPL Fan Cricket Championship",
      slug: "ipl-fan-cricket-2027",
      shortDescription: "T20 knock-out amateur championship under floodlights.",
      description: "Experience the adrenaline of live cricket tournament with official umpires, leather balls, and cash prizes.",
      type: "CRICKET",
      status: "PUBLISHED",
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
      startDate: new Date("2027-03-10T09:00:00Z"),
      endDate: new Date("2027-03-12T18:00:00Z"),
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      venueName: "M. Chinnaswamy Stadium Grounds",
      tags: ["cricket", "tournament", "t20", "bangalore"],
      categories: [
        { name: "Under-19 Squad", price: 5000, capacity: 32, registeredCount: 16 },
        { name: "Open Category Squad", price: 8000, capacity: 64, registeredCount: 28 },
      ],
    },
    {
      title: "Sunrise Yoga & Fitness Festival",
      slug: "sunrise-yoga-fitness-2027",
      shortDescription: "3-day seaside wellness retreat, yoga workshops and mindfulness.",
      description: "Recharge your mind and body by the Goan coast with international yoga masters and sound bath healers.",
      type: "FITNESS",
      status: "PUBLISHED",
      isFeatured: false,
      coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
      startDate: new Date("2027-02-14T05:30:00Z"),
      endDate: new Date("2027-02-14T12:00:00Z"),
      city: "Goa",
      state: "Goa",
      country: "India",
      venueName: "Baga Beach Grounds",
      tags: ["yoga", "fitness", "wellness", "goa"],
      categories: [
        { name: "Morning Flow Pass", price: 0, capacity: 500, registeredCount: 210 },
        { name: "All-Day Workshop Pass", price: 1200, capacity: 200, registeredCount: 85 },
      ],
    },
    {
      title: "Delhi Metro Football Cup",
      slug: "delhi-football-cup-2027",
      shortDescription: "7-a-side football tournament for colleges and corporate teams.",
      description: "High-octane football on FIFA certified turf with live broadcast commentary.",
      type: "FOOTBALL",
      status: "PUBLISHED",
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
      startDate: new Date("2027-04-05T08:00:00Z"),
      endDate: new Date("2027-04-07T18:00:00Z"),
      city: "New Delhi",
      state: "Delhi",
      country: "India",
      venueName: "Jawaharlal Nehru Stadium Arena",
      tags: ["football", "soccer", "delhi", "tournament"],
      categories: [
        { name: "Team Registration", price: 6000, capacity: 32, registeredCount: 20 },
      ],
    },
  ];

  for (const item of eventsData) {
    const { categories, ...eventInfo } = item;
    const existing = await prisma.event.findUnique({
      where: { slug: eventInfo.slug },
    });

    let eventId;
    if (!existing) {
      const created = await prisma.event.create({
        data: {
          ...eventInfo,
          organizerId: organizer.id,
        },
      });
      eventId = created.id;
      console.log(`✅ Event created: ${created.title}`);
    } else {
      eventId = existing.id;
      console.log(`ℹ️ Event already exists: ${existing.title}`);
    }

    // Insert categories if not exists
    const existingCats = await prisma.eventCategory.findMany({
      where: { eventId },
    });
    if (existingCats.length === 0) {
      for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        await prisma.eventCategory.create({
          data: {
            eventId,
            name: cat.name,
            price: cat.price,
            distance: cat.distance ?? null,
            capacity: cat.capacity,
            registeredCount: cat.registeredCount || 0,
            sortOrder: i,
          },
        });
      }
      console.log(`   🏷️ Categories created for ${eventInfo.title}`);
    }
  }

  console.log("🎉 Seeding completed successfully in MongoDB!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
