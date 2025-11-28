"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Check, Star, Zap, Shield, ArrowRight } from "lucide-react"

const benefits = [
  {
    icon: Star,
    title: "Prime Placement Discounts",
    description: "Get 20% off all prime advertising placements",
  },
  {
    icon: Zap,
    title: "Priority Support",
    description: "Fast-track support for all your questions",
  },
  {
    icon: Shield,
    title: "Enhanced Features",
    description: "Access to advanced event management tools",
  },
]

export function PremiumCTA() {
  const { data: session } = useSession()
  const isPremium = session?.user?.isPremium

  if (isPremium) {
    return null
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-2 border-primary">
            <CardHeader className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Star className="h-6 w-6 text-primary" />
                <CardTitle className="text-3xl">Upgrade to Premium</CardTitle>
              </div>
              <CardDescription className="text-lg">
                Unlock exclusive benefits and grow your event reach
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="text-center space-y-2"
                    >
                      <div className="flex justify-center mb-2">
                        <div className="p-3 bg-primary/10 border border-primary">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <div className="text-center space-y-2">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">$9.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Cancel anytime. No hidden fees.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {session ? (
                    <Link href="/premium" className="w-full sm:w-auto">
                      <Button size="lg" className="w-full sm:w-auto flex items-center gap-2">
                        Upgrade Now
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/register" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto">
                          Sign Up Free
                        </Button>
                      </Link>
                      <Link href="/premium" className="w-full sm:w-auto">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto flex items-center gap-2">
                          Learn More
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

