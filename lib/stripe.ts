import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
})

export const PRIME_PLACEMENT_PRICES = {
  homepage: 5000, // $50.00 in cents
  category: 3000, // $30.00 in cents
  search: 2000, // $20.00 in cents
}

