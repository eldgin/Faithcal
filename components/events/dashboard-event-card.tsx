"use client"

import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Edit } from "lucide-react"
import { motion } from "framer-motion"

interface DashboardEventCardProps {
  event: {
    id: string
    title: string
    description: string
    startDate: Date
    startTime: string
    location: string
    category: {
      name: string
      slug: string
    }
    media: Array<{
      type: string
      url: string
    }>
  }
}

export function DashboardEventCard({ event }: DashboardEventCardProps) {
  const imageMedia = event.media.find((m) => m.type === "image")
  const imageUrl = imageMedia?.url || "https://images.pexels.com/photos/1204960/pexels-photo-1204960.jpeg?auto=compress&cs=tinysrgb&w=800"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="h-full flex flex-col overflow-hidden border-border hover:border-primary transition-colors">
        <Link href={`/events/${event.id}`}>
          <div className="relative w-full h-48 bg-muted">
            <Image
              src={imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <Link href={`/events/${event.id}`}>
              <h3 className="text-xl font-semibold line-clamp-2 hover:text-primary transition-colors">
                {event.title}
              </h3>
            </Link>
            <Badge variant="secondary">{event.category.name}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {event.description}
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(event.startDate), "MMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{event.startTime}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Link href={`/events/${event.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View
            </Button>
          </Link>
          <Link href={`/events/${event.id}/edit`} className="flex-1">
            <Button variant="default" className="w-full flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

