import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
      userId,
    } = await request.json()

    // Verify payment signature
    const secret = process.env.RAZORPAY_KEY_SECRET || ''
    const text = `${razorpay_order_id}|${razorpay_payment_id}`
    const generated_signature = createHmac('sha256', secret)
      .update(text)
      .digest('hex')

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed' },
        { status: 400 }
      )
    }

    // Payment verified successfully
    // In production, update user subscription in database
    // await updateUserSubscription(userId, planId)
    // await savePaymentToDatabase({
    //   paymentId: razorpay_payment_id,
    //   orderId: razorpay_order_id,
    //   userId,
    //   planId,
    //   amount: amount,
    //   status: 'success',
    // })

    // Send confirmation email
    try {
      await sendEmail({
        to: 'user@example.com', // Replace with actual user email from database
        subject: 'Payment Successful - AI Video Generator',
        html: `
          <h2>Payment Successful!</h2>
          <p>Thank you for your subscription to ${planId} plan.</p>
          <p>Payment ID: ${razorpay_payment_id}</p>
          <p>Order ID: ${razorpay_order_id}</p>
          <p>Your account has been upgraded successfully.</p>
        `,
      })
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the payment if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
    })
  } catch (error: any) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Payment verification failed' },
      { status: 500 }
    )
  }
}

