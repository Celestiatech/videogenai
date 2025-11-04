'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Video, Image as ImageIcon, Sparkles, Loader2, Download, Play, Zap, Shield, Globe, Clock, Check, ArrowRight, Star, TrendingUp, Users, Award } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [mode, setMode] = useState<'text' | 'image'>('text')

  const handleGenerate = async () => {
    if (mode === 'text' && !prompt.trim()) {
      alert('Please enter a prompt')
      return
    }
    if (mode === 'image' && !imageUrl.trim()) {
      alert('Please upload an image')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode,
          prompt: mode === 'text' ? prompt : undefined,
          imageUrl: mode === 'image' ? imageUrl : undefined,
        }),
      })

      const data = await response.json()
      if (data.success && data.videoUrl) {
        setGeneratedVideo(data.videoUrl)
      } else {
        alert(data.error || 'Failed to generate video')
      }
    } catch (error) {
      console.error('Error generating video:', error)
      alert('An error occurred while generating the video')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const features = [
    {
      icon: Video,
      title: 'Text to Video',
      description: 'Transform your ideas into stunning videos with simple text prompts',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: ImageIcon,
      title: 'Image to Video',
      description: 'Animate static images into dynamic, engaging videos',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate professional videos in minutes, not hours',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'High Quality',
      description: 'Create videos up to 4K resolution with professional quality',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Globe,
      title: 'No Watermarks',
      description: 'Premium plans include watermark-free videos for commercial use',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Generate videos anytime, anywhere with our always-on platform',
      color: 'from-red-500 to-pink-500',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Content Creator',
      image: '👩',
      text: 'This tool has revolutionized my content creation. I can now produce videos in minutes!',
      rating: 5,
    },
    {
      name: 'Raj Kumar',
      role: 'Marketing Director',
      image: '👨',
      text: 'The quality is outstanding and the pricing is very reasonable. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Emily Johnson',
      role: 'Social Media Manager',
      image: '👩',
      text: 'Best AI video generator I\'ve used. It saves me hours every week.',
      rating: 5,
    },
  ]

  const stats = [
    { icon: Users, value: '10K+', label: 'Happy Users' },
    { icon: Video, value: '50K+', label: 'Videos Generated' },
    { icon: TrendingUp, value: '99%', label: 'Satisfaction Rate' },
    { icon: Award, value: '4.9/5', label: 'Average Rating' },
  ]

  const faqs = [
    {
      question: 'How long does it take to generate a video?',
      answer: 'Most videos are generated within 2-5 minutes, depending on the complexity and length.',
    },
    {
      question: 'What video formats are supported?',
      answer: 'We support MP4, MOV, and WebM formats. Videos can be exported in various resolutions up to 4K.',
    },
    {
      question: 'Can I use the videos commercially?',
      answer: 'Yes! Premium plans include full commercial license. Free plan videos have watermarks.',
    },
    {
      question: 'Do I need technical skills to use this?',
      answer: 'Not at all! Our platform is designed for everyone. Just describe what you want or upload an image.',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full mb-6 hover-lift"
            >
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-sm text-gray-300">Powered by Advanced AI</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Create Stunning Videos
              </span>
              <br />
              <span className="text-white">with AI Magic</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your ideas into professional videos in minutes. No design skills required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/pricing"
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 flex items-center justify-center gap-2 hover-lift"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 glass-effect text-white font-semibold rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 hover-lift">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Video Generator Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-4xl mx-auto glass-effect rounded-2xl shadow-2xl p-8 hover-lift"
            >
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => setMode('text')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    mode === 'text'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <Video className="w-5 h-5 inline mr-2" />
                  Text to Video
                </button>
                <button
                  onClick={() => setMode('image')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    mode === 'image'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <ImageIcon className="w-5 h-5 inline mr-2" />
                  Image to Video
                </button>
              </div>

              {mode === 'text' ? (
                <div className="space-y-6">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="A serene sunset over mountains with birds flying..."
                    className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>
              ) : (
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-gray-300">
                      Click to upload or drag and drop
                    </span>
                  </label>
                  {imageUrl && (
                    <div className="mt-4">
                      <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="max-w-full h-48 mx-auto rounded-lg object-contain"
                      />
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover-lift flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating video...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Video
                  </>
                )}
              </button>
            </motion.div>

            {generatedVideo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl mx-auto mt-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
              >
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Play className="w-6 h-6 text-purple-400" />
                  Generated Video
                </h2>
                <div className="relative rounded-lg overflow-hidden bg-black">
                  <video
                    src={generatedVideo}
                    controls
                    className="w-full h-auto"
                    autoPlay
                  />
                </div>
                <a
                  href={generatedVideo}
                  download
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Video
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/5 backdrop-blur-lg border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to create amazing videos
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
                className="group glass-effect rounded-xl p-6 hover:border-purple-500/50 transition-all hover-lift"
              >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white/5 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Create professional videos in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', title: 'Describe or Upload', desc: 'Enter your text prompt or upload an image' },
              { step: '2', title: 'AI Generates', desc: 'Our AI creates your video in minutes' },
              { step: '3', title: 'Download & Share', desc: 'Download your video and share it anywhere' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied creators
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg border-y border-white/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Choose the perfect plan for your needs. Start free, upgrade anytime.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50"
            >
              View Pricing Plans
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to know
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-bold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
