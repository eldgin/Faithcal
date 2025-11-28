import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import { MainNav } from "@/components/navigation/main-nav"
import { EventForm } from "@/components/events/event-form"

async function getEvent(id: string, userId: string) {
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      category: true,
      media: true,
    },
  })

  if (!event) {
    return null
  }

  // Check if user owns the event or if event has no owner (guest post)
  if (event.userId && event.userId !== userId) {
    return null
  }

  return event
}

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id || ""
  const { id } = await params

  const event = await getEvent(id, userId)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-8">
            Edit Event
          </h1>
          <EventForm event={event} />
        </div>
      </main>
    </div>
  )
}

