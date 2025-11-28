import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { stripe } from "@/lib/stripe"

const PREMIUM_PRICE_ID = process.env.STRIPE_PREMIUM_PRICE_ID || ""

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!PREMIUM_PRICE_ID) {
      return NextResponse.json(
        { error: "Premium price not configured" },
        { status: 500 }
      )
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: PREMIUM_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/premium?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/premium?payment=cancelled`,
      metadata: {
        userId: session.user.id,
        type: "premium",
      },
    })

    return NextResponse.json({ sessionId: checkoutSession.id })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}

