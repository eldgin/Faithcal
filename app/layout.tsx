import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { MainFooter } from "@/components/footer/main-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Faithcal - Faith-Based Events",
  description: "Discover and share faith-based events, concerts, workshops, revivals, and conferences",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <MainFooter />
        </Providers>
      </body>
    </html>
  )
}

