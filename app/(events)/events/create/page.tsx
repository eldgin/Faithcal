import { MainNav } from "@/components/navigation/main-nav"
import { EventForm } from "@/components/events/event-form"

export default function CreateEventPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-8">
            Post a New Event
          </h1>
          <EventForm />
        </div>
      </main>
    </div>
  )
}

