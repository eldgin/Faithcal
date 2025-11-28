import { prisma } from "@/lib/db/prisma"
import { MainNav } from "@/components/navigation/main-nav"
import { EventCard } from "@/components/events/event-card"
import { SearchBar } from "@/components/search/search-bar"

interface SearchParams {
  q?: string
  category?: string
}

async function getEvents(searchParams: SearchParams) {
  const where: any = {}

  if (searchParams.q) {
    where.OR = [
      { title: { contains: searchParams.q, mode: "insensitive" } },
      { description: { contains: searchParams.q, mode: "insensitive" } },
      { location: { contains: searchParams.q, mode: "insensitive" } },
    ]
  }

  if (searchParams.category && searchParams.category !== "all") {
    where.category = {
      slug: searchParams.category,
    }
  }

  const events = await prisma.event.findMany({
    where,
    include: {
      category: true,
      media: true,
    },
    orderBy: [
      { isPrimePlacement: "desc" },
      { createdAt: "desc" },
    ],
  })

  return events
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const events = await getEvents(params)

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">All Events</h1>
          <SearchBar />
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No events found. Try adjusting your search criteria.
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

