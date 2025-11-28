"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X, Upload, Image as ImageIcon, Music, Video } from "lucide-react"

interface MediaUploadProps {
  mediaFiles: {
    images: File[]
    audio: File[]
    video: File[]
  }
  onMediaChange: (media: {
    images: File[]
    audio: File[]
    video: File[]
  }) => void
}

export function MediaUpload({ mediaFiles, onMediaChange }: MediaUploadProps) {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  function validateAudio(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const audio = new Audio()
      audio.src = URL.createObjectURL(file)
      audio.onloadedmetadata = () => {
        URL.revokeObjectURL(audio.src)
        resolve(audio.duration <= 30)
      }
      audio.onerror = () => {
        URL.revokeObjectURL(audio.src)
        resolve(false)
      }
    })
  }

  function validateVideo(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const video = document.createElement("video")
      video.src = URL.createObjectURL(file)
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src)
        resolve(video.duration <= 20)
      }
      video.onerror = () => {
        URL.revokeObjectURL(video.src)
        resolve(false)
      }
    })
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))
    onMediaChange({
      ...mediaFiles,
      images: [...mediaFiles.images, ...imageFiles],
    })
  }

  async function handleAudioChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const audioFiles = files.filter((file) => file.type.startsWith("audio/"))

    for (const file of audioFiles) {
      const isValid = await validateAudio(file)
      if (!isValid) {
        alert(`Audio file "${file.name}" exceeds 30 seconds limit`)
        continue
      }
      onMediaChange({
        ...mediaFiles,
        audio: [...mediaFiles.audio, file],
      })
    }
  }

  async function handleVideoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const videoFiles = files.filter((file) => file.type.startsWith("video/"))

    for (const file of videoFiles) {
      const isValid = await validateVideo(file)
      if (!isValid) {
        alert(`Video file "${file.name}" exceeds 20 seconds limit`)
        continue
      }
      onMediaChange({
        ...mediaFiles,
        video: [...mediaFiles.video, file],
      })
    }
  }

  function removeImage(index: number) {
    onMediaChange({
      ...mediaFiles,
      images: mediaFiles.images.filter((_, i) => i !== index),
    })
  }

  function removeAudio(index: number) {
    onMediaChange({
      ...mediaFiles,
      audio: mediaFiles.audio.filter((_, i) => i !== index),
    })
  }

  function removeVideo(index: number) {
    onMediaChange({
      ...mediaFiles,
      video: mediaFiles.video.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label>Images</Label>
        <div className="mt-2 space-y-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => imageInputRef.current?.click()}
            className="w-full"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Upload Images
          </Button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
          {mediaFiles.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {mediaFiles.images.map((file, index) => {
                const imageUrl = URL.createObjectURL(file)
                return (
                  <div key={index} className="relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div>
        <Label>Audio (Max 30 seconds)</Label>
        <div className="mt-2 space-y-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => audioInputRef.current?.click()}
            className="w-full"
          >
            <Music className="h-4 w-4 mr-2" />
            Upload Audio
          </Button>
          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            multiple
            onChange={handleAudioChange}
            className="hidden"
          />
          {mediaFiles.audio.length > 0 && (
            <div className="space-y-2 mt-4">
              {mediaFiles.audio.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border"
                >
                  <span className="text-sm">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAudio(index)}
                    className="text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <Label>Video (Max 20 seconds)</Label>
        <div className="mt-2 space-y-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => videoInputRef.current?.click()}
            className="w-full"
          >
            <Video className="h-4 w-4 mr-2" />
            Upload Video
          </Button>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoChange}
            className="hidden"
          />
          {mediaFiles.video.length > 0 && (
            <div className="space-y-2 mt-4">
              {mediaFiles.video.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border"
                >
                  <span className="text-sm">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeVideo(index)}
                    className="text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

