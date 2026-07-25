import { PrismaClient, Purpose, PropertyType, ConstructionStatus, FurnishingStatus, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Address Box database in Supabase...");

  // 1. Create Country, State, City, and Area
  const country = await prisma.country.upsert({
    where: { name: "India" },
    update: {},
    create: { name: "India" },
  });

  const state = await prisma.state.upsert({
    where: { name: "Gujarat" },
    update: {},
    create: { name: "Gujarat", countryId: country.id },
  });

  const ahmedabad = await prisma.city.upsert({
    where: { name: "Ahmedabad" },
    update: {},
    create: { name: "Ahmedabad", stateId: state.id },
  });

  const bopal = await prisma.area.create({
    data: { name: "Bopal", cityId: ahmedabad.id },
  });

  // 2. Create System Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@addressbox.in" },
    update: {},
    create: {
      email: "admin@addressbox.in",
      name: "Rama Realty Admin",
      role: Role.ADMIN,
      isVerified: true,
    },
  });

  // 3. Create Sample Properties
  const prop1 = await prisma.property.create({
    data: {
      title: "Shivalik Edge 4 BHK Ultra-Luxury Residence",
      slug: "shivalik-edge-bopal-4bhk",
      description: "Shivalik Edge is an ultra-luxury residential landmark located in Bopal, Ahmedabad. Featuring spacious 4 BHK apartments with cross ventilation, private sundecks, and zero brokerage terms.",
      purpose: Purpose.BUY,
      type: PropertyType.RESIDENTIAL,
      category: "Flat/Apartment",
      price: 36200000,
      area: 2267,
      bedrooms: 4,
      bathrooms: 4,
      parking: 2,
      furnished: FurnishingStatus.SEMI_FURNISHED,
      status: ConstructionStatus.READY_TO_MOVE,
      isVerified: true,
      isFeatured: true,
      isReraApproved: true,
      reraId: "PR/GJ/AHMEDABAD/AHMEDABAD CITY/AUDA/RAA07880/070121",
      address: "SHIVALIK EDGE, Maruti Suzuki ARENA Lane, Bopal, Ahmedabad - 380058",
      latitude: 23.030357,
      longitude: 72.565937,
      cityId: ahmedabad.id,
      areaId: bopal.id,
      createdById: adminUser.id,
      images: {
        create: [
          { url: "https://www.addressbox.com/uploads/large/ae7734e3-9f21-4282-ac19-4d06723fc6ae_large.jpg", isCover: true },
          { url: "https://www.addressbox.com/uploads/large/e2df3632-3dfd-40a7-a64a-a4eefa5043fb_large.jpg", isCover: false },
        ]
      }
    },
  });

  console.log("Seeding finished successfully. Seeded property:", prop1.title);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
