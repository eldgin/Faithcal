import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

async function saveFile(file: File, type: string): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadsDir = join(process.cwd(), "public", "uploads", type)
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true })
  }

  const filename = `${Date.now()}-${file.name}`
  const filepath = join(uploadsDir, filename)
  await writeFile(filepath, buffer)

  return `/uploads/${type}/${filename}`
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const categoryId = formData.get("categoryId") as string
    const startDate = formData.get("startDate") as string
    const startTime = formData.get("startTime") as string
    const location = formData.get("location") as string
    const performers = formData.get("performers") as string | null
    const speakers = formData.get("speakers") as string | null
    const topics = formData.get("topics") as string | null
    const userId = formData.get("userId") as string | null

    if (!title || !description || !categoryId || !startDate || !startTime || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        categoryId,
        startDate: new Date(startDate),
        startTime,
        location,
        performers: performers || null,
        speakers: speakers || null,
        topics: topics || null,
        userId: userId || null,
      },
    })

    // Handle image uploads
    const imageFiles = formData.getAll("images") as File[]
    for (const file of imageFiles) {
      if (file.size > 0) {
        const url = await saveFile(file, "images")
        await prisma.eventMedia.create({
          data: {
            eventId: event.id,
            type: "image",
            url,
          },
        })
      }
    }

    // Handle audio uploads
    const audioFiles = formData.getAll("audio") as File[]
    for (const file of audioFiles) {
      if (file.size > 0) {
        const url = await saveFile(file, "audio")
        // Note: Duration validation should be done client-side
        // Server-side duration extraction requires additional setup
        await prisma.eventMedia.create({
          data: {
            eventId: event.id,
            type: "audio",
            url,
            duration: null, // Would need server-side media processing
          },
        })
      }
    }

    // Handle video uploads
    const videoFiles = formData.getAll("video") as File[]
    for (const file of videoFiles) {
      if (file.size > 0) {
        const url = await saveFile(file, "video")
        await prisma.eventMedia.create({
          data: {
            eventId: event.id,
            type: "video",
            url,
            duration: null, // Would need server-side media processing
          },
        })
      }
    }

    return NextResponse.json({ event })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    )
  }
}

