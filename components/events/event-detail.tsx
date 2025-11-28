"use client"

import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, User, Mic, BookOpen, Edit } from "lucide-react"
import { motion } from "framer-motion"
import { PlacementSelector } from "@/components/prime-placement/placement-selector"

interface EventDetailProps {
  event: {
    id: string
    title: string
    description: string
    startDate: Date
    startTime: string
    location: string
    performers?: string | null
    speakers?: string | null
    topics?: string | null
    category: {
      name: string
      slug: string
    }
    media: Array<{
      id: string
      type: string
      url: string
      duration?: number | null
    }>
    user?: {
      name: string | null
      email: string | null
    } | null
  }
  canEdit?: boolean
}

export function EventDetail({ event, canEdit = false }: EventDetailProps) {
  const imageMedia = event.media.filter((m) => m.type === "image")
  const audioMedia = event.media.filter((m) => m.type === "audio")
  const videoMedia = event.media.filter((m) => m.type === "video")
  const primaryImage = imageMedia[0]?.url || "https://images.pexels.com/photos/1204960/pexels-photo-1204960.jpeg?auto=compress&cs=tinysrgb&w=1200"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="relative w-full h-96 bg-muted">
        <Image
          src={primaryImage}
          alt={event.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-4xl font-bold">{event.title}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {event.category.name}
                </Badge>
                {canEdit && (
                  <Link href={`/events/${event.id}/edit`}>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <p className="text-lg text-muted-foreground whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {imageMedia.length > 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imageMedia.slice(1).map((media) => (
                  <div key={media.id} className="relative w-full h-48 bg-muted">
                    <Image
                      src={media.url}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {audioMedia.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Audio</h2>
              <div className="space-y-4">
                {audioMedia.map((media) => (
                  <div key={media.id}>
                    <audio controls className="w-full">
                      <source src={media.url} />
                      Your browser does not support the audio element.
                    </audio>
                    {media.duration && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Duration: {media.duration}s
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {videoMedia.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Video</h2>
              <div className="space-y-4">
                {videoMedia.map((media) => (
                  <div key={media.id}>
                    <video controls className="w-full">
                      <source src={media.url} />
                      Your browser does not support the video element.
                    </video>
                    {media.duration && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Duration: {media.duration}s
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(event.startDate), "EEEE, MMMM d, yyyy")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">{event.startTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {event.performers && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-line">{event.performers}</p>
              </CardContent>
            </Card>
          )}

          {event.speakers && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Speakers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-line">{event.speakers}</p>
              </CardContent>
            </Card>
          )}

          {event.topics && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-line">{event.topics}</p>
              </CardContent>
            </Card>
          )}

          {event.user && (
            <Card>
              <CardHeader>
                <CardTitle>Posted By</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{event.user.name || event.user.email}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Promote Your Event</CardTitle>
            </CardHeader>
            <CardContent>
              <PlacementSelector eventId={event.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}

