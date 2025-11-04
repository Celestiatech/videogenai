import { Metadata } from 'next'
import { Sparkles, Users, Target, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - AI Video Generator',
  description: 'Learn about AI Video Generator and our mission to make video creation accessible to everyone through artificial intelligence.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            About AI Video Generator
          </h1>
          <p className="text-xl text-gray-300">
            Empowering creators with AI-powered video generation
          </p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p>
              At AI Video Generator, we believe that everyone should have the power to create
              stunning videos, regardless of technical expertise or budget. Our mission is to
              democratize video creation through cutting-edge artificial intelligence technology.
            </p>
          </section>

          <section className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">What We Do</h2>
            <p className="mb-4">
              We provide a revolutionary platform that transforms text descriptions and static
              images into professional-quality videos using advanced AI models. Whether you're a
              content creator, marketer, educator, or business owner, our tools help you bring
              your ideas to life.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">AI-Powered</h3>
                <p className="text-sm">State-of-the-art AI models</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">User-Friendly</h3>
                <p className="text-sm">Easy to use interface</p>
              </div>
              <div className="text-center">
                <Target className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Fast & Efficient</h3>
                <p className="text-sm">Quick video generation</p>
              </div>
            </div>
          </section>

          <section className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <span><strong className="text-white">Innovation:</strong> We continuously push the boundaries of AI technology</span>
              </li>
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <span><strong className="text-white">Accessibility:</strong> Making professional tools available to everyone</span>
              </li>
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <span><strong className="text-white">Quality:</strong> Delivering high-quality results that exceed expectations</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}

