import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/db/prisma"
import Stripe from "stripe"

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    return NextResponse.json(
      { error: "No signature" },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    )
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const eventId = session.metadata?.eventId
    const placementType = session.metadata?.placementType
    const userId = session.metadata?.userId

    if (eventId && placementType && userId) {
      // Update event with prime placement
      await prisma.event.update({
        where: { id: eventId },
        data: {
          isPrimePlacement: true,
          primePlacementType: placementType,
        },
      })

      // Create payment record
      await prisma.payment.create({
        data: {
          userId,
          eventId,
          amount: (session.amount_total || 0) / 100,
          stripePaymentId: session.id,
          status: "completed",
        },
      })
    }
  }

  return NextResponse.json({ received: true })
}

