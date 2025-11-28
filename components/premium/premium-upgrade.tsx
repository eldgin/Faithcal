"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Check, Star, Zap, Shield, TrendingUp, Users, Bell } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PremiumUpgradeProps {
  isPremium: boolean
}

const premiumFeatures = [
  {
    icon: Star,
    title: "Prime Placement Discounts",
    description: "Save 20% on all prime advertising placements",
  },
  {
    icon: Zap,
    title: "Priority Support",
    description: "Get fast-track support for all your questions",
  },
  {
    icon: Shield,
    title: "Enhanced Features",
    description: "Access to advanced event management tools",
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    description: "Track your event performance and engagement",
  },
  {
    icon: Users,
    title: "Unlimited Events",
    description: "Post as many events as you want",
  },
  {
    icon: Bell,
    title: "Early Access",
    description: "Be first to know about new features",
  },
]

export function PremiumUpgrade({ isPremium }: PremiumUpgradeProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  async function handleUpgrade() {
    if (!session) {
      window.location.href = "/register"
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/stripe/create-premium-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      setIsLoading(false)
    }
  }

  if (isPremium) {
    return (
      <Card className="border-2 border-primary">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            You&apos;re a Premium Member
          </CardTitle>
          <CardDescription className="text-lg">
            Thank you for your support! Enjoy all premium benefits.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiumFeatures.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/20 border-2 border-primary">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Card className="border-2 border-primary">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl">Premium Membership</CardTitle>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-bold">$9.99</span>
            <span className="text-xl text-muted-foreground">/month</span>
          </div>
          <CardDescription className="text-lg">
            Cancel anytime. No hidden fees.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {premiumFeatures.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            {session ? (
              <Button
                size="lg"
                className="w-full"
                onClick={handleUpgrade}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Upgrade to Premium"}
              </Button>
            ) : (
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => (window.location.href = "/register")}
                >
                  Sign Up to Upgrade
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a href="/login" className="text-primary hover:underline">
                    Sign in
                  </a>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

