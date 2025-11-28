import { MainNav } from "@/components/navigation/main-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Heart, Sparkles } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Faith-Centered",
    description: "We believe in the power of faith communities coming together to share meaningful experiences.",
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "Our platform connects believers and helps build stronger, more engaged faith communities.",
  },
  {
    icon: Calendar,
    title: "Event Discovery",
    description: "Making it easy to find and share faith-based events that inspire and uplift.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Leveraging technology to serve faith communities in new and meaningful ways.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MainNav />
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">About Faithcal</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connecting faith communities through events, experiences, and meaningful connections.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground">
              Faithcal was created to serve faith communities by providing a platform where believers 
              can discover, share, and connect through faith-based events. Whether it&apos;s a concert, 
              workshop, revival, conference, or any other gathering, we believe these events strengthen 
              communities and deepen faith.
            </p>
            <p className="text-muted-foreground">
              Our goal is to make it easy for event organizers to reach their communities and for 
              attendees to find events that inspire and uplift them.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <Card key={value.title}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 border border-primary">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle>{value.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">For Event Organizers</h2>
            <p className="text-muted-foreground">
              Faithcal provides tools to help you promote your events effectively. Post your events 
              with detailed information, media, and reach your target audience. Our prime placement 
              options help you get maximum visibility for your important events.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">For Attendees</h2>
            <p className="text-muted-foreground">
              Discover faith-based events in your area or around the world. Search by category, 
              location, or keyword to find events that match your interests. Create an account to 
              save events, manage your calendar, and stay connected with your faith community.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="text-muted-foreground">
              We&apos;d love to hear from you! Whether you have questions, feedback, or suggestions, 
              please visit our <a href="/contact" className="text-primary hover:underline">contact page</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}

