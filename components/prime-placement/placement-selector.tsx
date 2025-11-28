"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { loadStripe } from "@stripe/stripe-js"
import { Home, FolderSearch, Search } from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PlacementSelectorProps {
  eventId: string
}

const PLACEMENT_OPTIONS = [
  {
    type: "homepage",
    name: "Homepage Featured",
    description: "Feature your event on the homepage",
    price: 50,
    icon: Home,
  },
  {
    type: "category",
    name: "Category Top",
    description: "Show at the top of category pages",
    price: 30,
    icon: FolderSearch,
  },
  {
    type: "search",
    name: "Search Results Top",
    description: "Appear first in search results",
    price: 20,
    icon: Search,
  },
]

export function PlacementSelector({ eventId }: PlacementSelectorProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  async function handlePlacement(placementType: string) {
    if (!session) {
      alert("Please sign in to purchase prime placement")
      return
    }

    setIsLoading(placementType)

    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, placementType }),
      })

      const { sessionId } = await response.json()

      if (!sessionId) {
        throw new Error("Failed to create checkout session")
      }

      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe failed to load")
      }

      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to start checkout. Please try again.")
      setIsLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Prime Advertising Placement</h3>
      <p className="text-sm text-muted-foreground">
        Get your event featured prominently on the site
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLACEMENT_OPTIONS.map((option) => {
          const Icon = option.icon
          return (
            <Card key={option.type}>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-5 w-5" />
                  <CardTitle className="text-lg">{option.name}</CardTitle>
                </div>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-2xl font-bold">${option.price}</span>
                </div>
                <Button
                  onClick={() => handlePlacement(option.type)}
                  disabled={isLoading === option.type}
                  className="w-full"
                >
                  {isLoading === option.type ? "Processing..." : "Purchase"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

