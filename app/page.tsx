'use client'

import { useState } from 'react'
import { Video, Image as ImageIcon, Sparkles, Loader2, Download, Play } from 'lucide-react'
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AI Video Generator
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your ideas into stunning videos with the power of AI
          </p>
        </motion.div>

        {/* Mode Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-8"
        >
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
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
        >
          {mode === 'text' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Enter your prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A serene sunset over mountains with birds flying..."
                  className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload an image
                </label>
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
              </div>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/50 flex items-center justify-center gap-2"
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

        {/* Generated Video */}
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
      </div>
    </main>
  )
}

