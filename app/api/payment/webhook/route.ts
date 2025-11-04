import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature') || ''

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || ''
    const expectedSignature = createHmac('sha256', secret)
      .update(body)
      .digest('hex')

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const event = JSON.parse(body)

    // Handle different event types
    switch (event.event) {
      case 'payment.captured':
        // Payment successful
        // Update user subscription in database
        // await updateUserSubscription(event.payload.payment.entity.notes.userId, event.payload.payment.entity.notes.planId)
        break

      case 'payment.failed':
        // Payment failed
        // Handle failed payment
        break

      case 'order.paid':
        // Order paid
        // Update order status in database
        break

      default:
        console.log('Unhandled event:', event.event)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

