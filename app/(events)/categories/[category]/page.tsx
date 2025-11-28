import { prisma } from "@/lib/db/prisma"
import { MainNav } from "@/components/navigation/main-nav"
import { EventCard } from "@/components/events/event-card"
import { notFound } from "next/navigation"

async function getCategoryEvents(categorySlug: string) {
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
  })

  if (!category) {
    return null
  }

  const events = await prisma.event.findMany({
    where: {
      categoryId: category.id,
    },
    include: {
      category: true,
      media: true,
    },
    orderBy: [
      { isPrimePlacement: "desc" },
      { createdAt: "desc" },
    ],
  })

  return { category, events }
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const result = await getCategoryEvents(params.category)

  if (!result) {
    notFound()
  }

  const { category, events } = result

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {category.name} Events
          </h1>
          <p className="text-muted-foreground">
            {events.length} event{events.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No events in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

