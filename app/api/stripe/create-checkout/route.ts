import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { stripe, PRIME_PLACEMENT_PRICES } from "@/lib/stripe"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { eventId, placementType } = body

    if (!eventId || !placementType) {
      return NextResponse.json(
        { error: "Event ID and placement type are required" },
        { status: 400 }
      )
    }

    if (!PRIME_PLACEMENT_PRICES[placementType as keyof typeof PRIME_PLACEMENT_PRICES]) {
      return NextResponse.json(
        { error: "Invalid placement type" },
        { status: 400 }
      )
    }

    const price = PRIME_PLACEMENT_PRICES[placementType as keyof typeof PRIME_PLACEMENT_PRICES]

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Prime Placement - ${placementType}`,
              description: `Feature your event on ${placementType} page`,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/events/${eventId}?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/events/${eventId}?payment=cancelled`,
      metadata: {
        eventId,
        placementType,
        userId: session.user.id,
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

