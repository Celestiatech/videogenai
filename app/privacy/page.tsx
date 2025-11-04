import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - AI Video Generator',
  description: 'Privacy policy for AI Video Generator. Learn how we protect and use your data.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, make a payment, or contact us.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, process payments, and communicate with you.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Payment Information</h2>
            <p>All payments are processed securely through Razorpay. We do not store your credit card information on our servers.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at privacy@aivideogen.com</p>
          </section>
        </div>
      </div>
    </main>
  )
}

