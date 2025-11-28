"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MediaUpload } from "@/components/events/media-upload"
import { Textarea } from "@/components/ui/textarea"

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string().min(1, "Category is required"),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().min(1, "Start time is required"),
  location: z.string().min(1, "Location is required"),
  performers: z.string().optional(),
  speakers: z.string().optional(),
  topics: z.string().optional(),
})

type EventFormData = z.infer<typeof eventSchema>

interface Category {
  id: string
  name: string
  slug: string
}

interface EventFormProps {
  event?: {
    id: string
    title: string
    description: string
    categoryId: string
    startDate: Date
    startTime: string
    location: string
    performers?: string | null
    speakers?: string | null
    topics?: string | null
    media: Array<{
      id: string
      type: string
      url: string
    }>
  }
}

export function EventForm({ event }: EventFormProps = {}) {
  const router = useRouter()
  const { data: session } = useSession()
  const isEditMode = !!event
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [mediaFiles, setMediaFiles] = useState<{
    images: File[]
    audio: File[]
    video: File[]
  }>({
    images: [],
    audio: [],
    video: [],
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: event
      ? {
          title: event.title,
          description: event.description,
          categoryId: event.categoryId,
          startDate: new Date(event.startDate).toISOString().split("T")[0],
          startTime: event.startTime,
          location: event.location,
          performers: event.performers || "",
          speakers: event.speakers || "",
          topics: event.topics || "",
        }
      : undefined,
  })

  const categoryId = watch("categoryId")

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/categories")
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    if (event) {
      setValue("title", event.title)
      setValue("description", event.description)
      setValue("categoryId", event.categoryId)
      setValue("startDate", new Date(event.startDate).toISOString().split("T")[0])
      setValue("startTime", event.startTime)
      setValue("location", event.location)
      setValue("performers", event.performers || "")
      setValue("speakers", event.speakers || "")
      setValue("topics", event.topics || "")
    }
  }, [event, setValue])

  async function onSubmit(data: EventFormData) {
    setIsLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("description", data.description)
      formData.append("categoryId", data.categoryId)
      formData.append("startDate", data.startDate)
      formData.append("startTime", data.startTime)
      formData.append("location", data.location)
      if (data.performers) formData.append("performers", data.performers)
      if (data.speakers) formData.append("speakers", data.speakers)
      if (data.topics) formData.append("topics", data.topics)
      if (session?.user?.id) formData.append("userId", session.user.id)

      // Append media files
      mediaFiles.images.forEach((file) => {
        formData.append("images", file)
      })
      mediaFiles.audio.forEach((file) => {
        formData.append("audio", file)
      })
      mediaFiles.video.forEach((file) => {
        formData.append("video", file)
      })

      const url = isEditMode ? `/api/events/${event.id}` : "/api/events"
      const method = isEditMode ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || `Failed to ${isEditMode ? "update" : "create"} event`)
        setIsLoading(false)
        return
      }

      router.push(`/events/${result.event.id}`)
      router.refresh()
    } catch (error) {
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 border border-destructive">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe your event"
              rows={5}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">Category *</Label>
            <Select
              value={categoryId}
              onValueChange={(value) => setValue("categoryId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-sm text-destructive">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Date & Time</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date *</Label>
            <Input
              id="startDate"
              type="date"
              {...register("startDate")}
            />
            {errors.startDate && (
              <p className="text-sm text-destructive">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time *</Label>
            <Input
              id="startTime"
              type="time"
              {...register("startTime")}
            />
            {errors.startTime && (
              <p className="text-sm text-destructive">
                {errors.startTime.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="Enter event location"
            />
            {errors.location && (
              <p className="text-sm text-destructive">
                {errors.location.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="performers">Performers</Label>
            <Textarea
              id="performers"
              {...register("performers")}
              placeholder="List performers (one per line)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="speakers">Speakers</Label>
            <Textarea
              id="speakers"
              {...register("speakers")}
              placeholder="List speakers (one per line)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topics">Topics</Label>
            <Textarea
              id="topics"
              {...register("topics")}
              placeholder="List topics (one per line)"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Media</CardTitle>
        </CardHeader>
        <CardContent>
          <MediaUpload
            mediaFiles={mediaFiles}
            onMediaChange={setMediaFiles}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? isEditMode
              ? "Updating Event..."
              : "Creating Event..."
            : isEditMode
            ? "Update Event"
            : "Create Event"}
        </Button>
      </div>
    </form>
  )
}

