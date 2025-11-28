import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { MainNav } from "@/components/navigation/main-nav"
import { PremiumUpgrade } from "@/components/premium/premium-upgrade"

export default async function PremiumPage() {
  const session = await getServerSession(authOptions)
  const isPremium = session?.user?.isPremium || false

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Premium Membership</h1>
            <p className="text-lg text-muted-foreground">
              Unlock exclusive benefits and maximize your event reach
            </p>
          </div>
          <PremiumUpgrade isPremium={isPremium} />
        </div>
      </main>
    </div>
  )
}

