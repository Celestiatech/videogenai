import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - AI Video Generator',
  description: 'Terms of service for AI Video Generator. Read our terms and conditions.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using AI Video Generator, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
            <p>Permission is granted to use our service for personal and commercial purposes, subject to the restrictions set forth in these terms.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Payment Terms</h2>
            <p>All payments are processed through Razorpay. Subscriptions are billed monthly. Refunds are available within 7 days of purchase.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. User Content</h2>
            <p>You retain ownership of all content you create. You grant us a license to process and store your content for service provision.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
            <p>AI Video Generator shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
          </section>
        </div>
      </div>
    </main>
  )
}

