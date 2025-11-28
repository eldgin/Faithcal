"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { User, LogOut, Calendar } from "lucide-react"

export function MainNav() {
  const { data: session } = useSession()

  return (
    <nav className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <Calendar className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
            <span className="text-xl font-semibold">
              <span className="text-primary">Faith</span>
              <span className="text-accent">cal</span>
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/events/create">
              <Button variant="outline">Post Event</Button>
            </Link>
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{session.user?.name || session.user?.email}</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => signOut()}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

