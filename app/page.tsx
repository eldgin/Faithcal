import { prisma } from "@/lib/db/prisma"
import { MainNav } from "@/components/navigation/main-nav"
import { EventCard } from "@/components/events/event-card"
import { HeroSection } from "@/components/home/hero-section"
import { PremiumCTA } from "@/components/home/premium-cta"

async function getFeaturedEvents() {
  const events = await prisma.event.findMany({
    where: {
      isPrimePlacement: true,
      primePlacementType: "homepage",
    },
    include: {
      category: true,
      media: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  })

  return events
}

async function getRecentEvents() {
  const events = await prisma.event.findMany({
    include: {
      category: true,
      media: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 12,
  })

  return events
}

export default async function HomePage() {
  const featuredEvents = await getFeaturedEvents()
  const recentEvents = await getRecentEvents()

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main>
        <HeroSection />

        <div className="container mx-auto px-4 py-16">
          {featuredEvents.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-semibold mb-8">Featured Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8">Recent Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        </div>

        <PremiumCTA />
      </main>
    </div>
  )
}

