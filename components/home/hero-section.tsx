"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search/search-bar"
import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full h-[600px] bg-muted overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/1204960/pexels-photo-1204960.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Faith-based community"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-6"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Faithcal
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground">
            Discover and Share Faith-Based Events
          </p>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with your community through concerts, workshops, revivals, conferences, and more. 
            Find inspiring events or share your own.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/events/create">
              <Button size="lg" className="flex items-center gap-2">
                Post Your Event
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/events">
              <Button size="lg" variant="outline">
                Browse Events
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-3xl mt-12"
        >
          <SearchBar />
        </motion.div>
      </div>
    </section>
  )
}

