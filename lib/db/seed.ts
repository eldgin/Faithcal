import { prisma } from "./prisma"

async function main() {
  // Create default categories
  const categories = [
    { name: "Concert", slug: "concert" },
    { name: "Workshop", slug: "workshop" },
    { name: "Revival", slug: "revival" },
    { name: "Conference", slug: "conference" },
    { name: "Seminar", slug: "seminar" },
    { name: "Retreat", slug: "retreat" },
    { name: "Service", slug: "service" },
    { name: "Other", slug: "other" },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }

  console.log("Seeded categories")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

