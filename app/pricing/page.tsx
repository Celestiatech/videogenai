'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Check, Sparkles, Zap, Crown, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    period: 'forever',
    icon: Sparkles,
    features: [
      '5 videos per month',
      '720p video quality',
      'Basic templates',
      'Text to video only',
      'Watermarked videos',
      'Community support',
    ],
    buttonText: 'Current Plan',
    buttonStyle: 'bg-gray-600',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹499',
    period: 'month',
    icon: Zap,
    features: [
      '50 videos per month',
      '1080p HD quality',
      'All video templates',
      'Text & Image to video',
      'No watermarks',
      'Priority support',
      'Commercial license',
      'API access',
    ],
    buttonText: 'Upgrade to Pro',
    buttonStyle: 'bg-gradient-to-r from-purple-600 to-pink-600',
    popular: true,
    amount: 49900, // in paise
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '₹1,999',
    period: 'month',
    icon: Crown,
    features: [
      'Unlimited videos',
      '4K video quality',
      'Custom templates',
      'All features included',
      'No watermarks',
      '24/7 priority support',
      'Full commercial license',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced analytics',
    ],
    buttonText: 'Upgrade to Enterprise',
    buttonStyle: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    popular: false,
    amount: 199900, // in paise
  },
]

export default function PricingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleSubscribe = async (planId: string, amount: number) => {
    if (!session) {
      router.push('/login?redirect=/pricing')
      return
    }

    if (planId === 'free') {
      return
    }

    setLoadingPlan(planId)

    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          amount,
          userId: (session.user as any)?.id,
        }),
      })

      const data = await response.json()

      if (data.success && data.orderId) {
        // Initialize Razorpay
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_key',
          amount: amount,
          currency: 'INR',
          name: 'AI Video Generator',
          description: `Subscription: ${planId}`,
          order_id: data.orderId,
          handler: async function (response: any) {
            // Verify payment
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId,
                userId: (session.user as any)?.id,
              }),
            })

            const verifyData = await verifyResponse.json()
            if (verifyData.success) {
              router.push('/dashboard?payment=success')
            } else {
              alert('Payment verification failed')
            }
          },
          prefill: {
            name: session.user?.name || '',
            email: session.user?.email || '',
          },
          theme: {
            color: '#8b5cf6',
          },
          modal: {
            ondismiss: function () {
              setLoadingPlan(null)
            },
          },
        }

        const razorpay = new (window as any).Razorpay(options)
        razorpay.open()
        setLoadingPlan(null)
      } else {
        alert(data.error || 'Failed to create order')
        setLoadingPlan(null)
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('An error occurred. Please try again.')
      setLoadingPlan(null)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm text-gray-300">Flexible Pricing</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the perfect plan for your video creation needs. All plans include Indian payment methods.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`relative glass-effect rounded-2xl p-8 border-2 transition-all ${
                  plan.popular
                    ? 'border-purple-500 shadow-2xl shadow-purple-500/50 scale-105 hover:shadow-purple-500/70'
                    : 'border-white/20 hover:border-purple-500/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full ${plan.popular ? 'bg-purple-500/20' : 'bg-white/10'}`}>
                      <Icon className={`w-8 h-8 ${plan.popular ? 'text-purple-400' : 'text-gray-400'}`} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period !== 'forever' && (
                      <span className="text-gray-400">/{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => plan.amount && handleSubscribe(plan.id, plan.amount)}
                  disabled={plan.id === 'free' || loadingPlan === plan.id}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                    plan.buttonStyle
                  } ${plan.id === 'free' ? 'cursor-default' : 'hover:shadow-lg hover-lift'} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    plan.buttonText
                  )}
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-8 text-center hover-lift"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Supported Payment Methods</h2>
          <p className="text-gray-300 mb-6">
            We support all major Indian payment methods through Razorpay
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-gray-400">
            <span>💳 Credit/Debit Cards</span>
            <span>🏦 Net Banking</span>
            <span>📱 UPI</span>
            <span>💼 Wallets (Paytm, PhonePe, etc.)</span>
            <span>🏧 Bank Transfer</span>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="glass-effect rounded-lg p-6 hover-lift">
              <h3 className="text-white font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-gray-300 text-sm">Yes, you can upgrade or downgrade your plan at any time from your dashboard.</p>
            </div>
            <div className="glass-effect rounded-lg p-6 hover-lift">
              <h3 className="text-white font-semibold mb-2">Is there a refund policy?</h3>
              <p className="text-gray-300 text-sm">We offer a 7-day money-back guarantee if you're not satisfied.</p>
            </div>
            <div className="glass-effect rounded-lg p-6 hover-lift">
              <h3 className="text-white font-semibold mb-2">Are payments secure?</h3>
              <p className="text-gray-300 text-sm">All payments are processed securely through Razorpay, a PCI DSS compliant payment gateway.</p>
            </div>
            <div className="glass-effect rounded-lg p-6 hover-lift">
              <h3 className="text-white font-semibold mb-2">What happens after payment?</h3>
              <p className="text-gray-300 text-sm">You'll receive a confirmation email and your account will be upgraded immediately.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
    </main>
  )
}

