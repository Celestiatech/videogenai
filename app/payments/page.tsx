'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CreditCard, Calendar, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface Payment {
  id: string
  paymentId: string
  orderId: string
  planId: string
  amount: number
  status: 'success' | 'failed' | 'pending'
  createdAt: string
}

export default function PaymentsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchPayments()
    }
  }, [session])

  const fetchPayments = async () => {
    try {
      // In production, fetch from your API
      // const response = await fetch('/api/payments')
      // const data = await response.json()
      // setPayments(data.payments)

      // Mock data for demo
      setPayments([
        {
          id: '1',
          paymentId: 'pay_1234567890',
          orderId: 'order_1234567890',
          planId: 'pro',
          amount: 49900,
          status: 'success',
          createdAt: new Date().toISOString(),
        },
      ])
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  if (!session) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Payment History</h1>
          </div>
          <p className="text-xl text-gray-300">
            View all your payment transactions
          </p>
        </motion.div>

        {/* Payments List */}
        {payments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-12 border border-white/20 text-center"
          >
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No payments found</p>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              View Pricing Plans
            </a>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      payment.status === 'success' ? 'bg-green-500/20' :
                      payment.status === 'failed' ? 'bg-red-500/20' :
                      'bg-yellow-500/20'
                    }`}>
                      {payment.status === 'success' ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : payment.status === 'failed' ? (
                        <XCircle className="w-6 h-6 text-red-400" />
                      ) : (
                        <Loader2 className="w-6 h-6 text-yellow-400 animate-spin" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold capitalize mb-1">
                        {payment.planId} Plan
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Payment ID: {payment.paymentId}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Order ID: {payment.orderId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white mb-1">
                      ₹{(payment.amount / 100).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(payment.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      payment.status === 'success' ? 'bg-green-500/20 text-green-400' :
                      payment.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {payment.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Download Invoice */}
        {payments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-bold text-white mb-4">Need an Invoice?</h2>
            <p className="text-gray-300 mb-4">
              Download invoices for all your payments from your dashboard.
            </p>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Download All Invoices
            </button>
          </motion.div>
        )}
      </div>
    </main>
  )
}

