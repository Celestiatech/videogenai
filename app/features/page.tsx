import { Metadata } from 'next'
import { Video, Image as ImageIcon, Sparkles, Zap, Shield, Globe, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export const metadata: Metadata = {
  title: 'Features - AI Video Generator',
  description: 'Discover powerful features of AI Video Generator - text to video, image to video, HD quality, and more.',
}

export default function FeaturesPage() {
  const features = [
    {
      icon: Video,
      title: 'Text to Video',
      description: 'Transform your text descriptions into stunning videos with AI. Simply describe what you want, and our AI creates it.',
    },
    {
      icon: ImageIcon,
      title: 'Image to Video',
      description: 'Animate static images into dynamic videos. Bring your photos to life with smooth animations.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate videos in minutes, not hours. Our optimized AI models deliver results quickly.',
    },
    {
      icon: Shield,
      title: 'High Quality',
      description: 'Create professional-quality videos up to 4K resolution. Perfect for any use case.',
    },
    {
      icon: Globe,
      title: 'No Watermarks',
      description: 'Premium plans include watermark-free videos. Own your content completely.',
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Generate videos anytime, anywhere. Our platform is always available when you need it.',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to create amazing videos with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 hover:border-purple-500/50 transition-all hover-lift"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

