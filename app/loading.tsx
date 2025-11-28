import { MainNav } from "@/components/navigation/main-nav"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-muted w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-48 bg-muted"></div>
                <div className="h-6 bg-muted w-3/4"></div>
                <div className="h-4 bg-muted w-full"></div>
                <div className="h-4 bg-muted w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

