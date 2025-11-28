import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db/prisma"
import { MainNav } from "@/components/navigation/main-nav"
import { EventCard } from "@/components/events/event-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getUserEvents(userId: string) {
  const events = await prisma.event.findMany({
    where: { userId },
    include: {
      category: true,
      media: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return events
}

async function getUserPayments(userId: string) {
  const payments = await prisma.payment.findMany({
    where: { userId },
    include: {
      event: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  })

  return payments
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  const events = await getUserEvents(session.user.id)
  const payments = await getUserPayments(session.user.id)

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your events and view your account
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{events.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Prime Placements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {events.filter((e) => e.isPrimePlacement).length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Account Type</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {session.user.isPremium ? "Premium" : "Standard"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Your Events</h2>
            {events.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    You haven't posted any events yet.
                  </p>
                  <a
                    href="/events/create"
                    className="text-primary hover:underline"
                  >
                    Create your first event
                  </a>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Recent Payments</h2>
            {payments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No payments yet
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <Card key={payment.id}>
                    <CardHeader>
                      <CardTitle className="text-base">
                        {payment.event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        ${payment.amount.toFixed(2)} - {payment.status}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

