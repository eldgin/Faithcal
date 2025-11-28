import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db/prisma"
import { MainNav } from "@/components/navigation/main-nav"
import { EventDetail } from "@/components/events/event-detail"
import { notFound } from "next/navigation"

async function getEvent(id: string) {
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      category: true,
      media: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })

  return event
}

export default async function EventDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  const event = await getEvent(params.id)

  if (!event) {
    notFound()
  }

  // Check if current user owns the event
  const canEdit = !event.userId || (session?.user?.id && event.userId === session.user.id)

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <EventDetail event={event} canEdit={canEdit} />
      </main>
    </div>
  )
}

