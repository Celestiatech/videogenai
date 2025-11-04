'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Video, Image as ImageIcon, Sparkles, User, Clock, Download, CreditCard, Crown } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [generatedVideos, setGeneratedVideos] = useState<Array<{
    id: string
    prompt?: string
    videoUrl: string
    createdAt: string
  }>>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
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
            <User className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          </div>
          <p className="text-xl text-gray-300">
            Welcome back, {session.user?.name || session.user?.email}!
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Videos</p>
                <p className="text-3xl font-bold text-white">{generatedVideos.length}</p>
              </div>
              <Video className="w-12 h-12 text-purple-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">This Month</p>
                <p className="text-3xl font-bold text-white">
                  {generatedVideos.filter(v => {
                    const videoDate = new Date(v.createdAt)
                    const now = new Date()
                    return videoDate.getMonth() === now.getMonth() &&
                           videoDate.getFullYear() === now.getFullYear()
                  }).length}
                </p>
              </div>
              <Sparkles className="w-12 h-12 text-pink-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Account Type</p>
                <p className="text-3xl font-bold text-white">Free</p>
                <a
                  href="/pricing"
                  className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block"
                >
                  Upgrade →
                </a>
              </div>
              <User className="w-12 h-12 text-blue-400" />
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/"
              className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Video className="w-8 h-8 text-purple-400" />
              <div>
                <p className="font-semibold text-white">Text to Video</p>
                <p className="text-sm text-gray-400">Generate from text prompt</p>
              </div>
            </a>
            <a
              href="/"
              className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ImageIcon className="w-8 h-8 text-pink-400" />
              <div>
                <p className="font-semibold text-white">Image to Video</p>
                <p className="text-sm text-gray-400">Animate your images</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Subscription Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30 mb-12"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Crown className="w-8 h-8 text-yellow-400" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Upgrade to Pro</h2>
                <p className="text-gray-300">Unlock unlimited videos and premium features</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/pricing"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                View Plans
              </Link>
              <Link
                href="/payments"
                className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-semibold flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Payment History
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Generated Videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Your Videos</h2>
          {generatedVideos.length === 0 ? (
            <div className="text-center py-12">
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No videos generated yet</p>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Create Your First Video
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white/5 rounded-lg overflow-hidden border border-white/10"
                >
                  <video
                    src={video.videoUrl}
                    className="w-full h-48 object-cover"
                    controls
                  />
                  <div className="p-4">
                    <p className="text-white font-semibold mb-2 truncate">
                      {video.prompt || 'Generated Video'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(video.createdAt).toLocaleDateString()}
                      </div>
                      <a
                        href={video.videoUrl}
                        download
                        className="flex items-center gap-1 text-purple-400 hover:text-purple-300"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}

