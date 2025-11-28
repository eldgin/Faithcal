"use client"

import { useRouter } from "next/navigation"
import { useQueryState } from "nuqs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

interface Category {
  id: string
  name: string
  slug: string
}

export function SearchBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useQueryState("q", { defaultValue: "" })
  const [category, setCategory] = useQueryState("category", { defaultValue: "" })
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/categories")
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (category) params.set("category", category)
    router.push(`/events?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-4">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.slug}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" className="flex items-center gap-2">
        <Search className="h-4 w-4" />
        Search
      </Button>
    </form>
  )
}

