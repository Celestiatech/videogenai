import { NextRequest, NextResponse } from 'next/server'

// This is a template that supports multiple AI video generation services
// You can integrate with: fal.ai, Replicate, Stability AI, or Runway ML

export async function POST(request: NextRequest) {
  try {
    const { mode, prompt, imageUrl } = await request.json()

    // Validate input
    if (mode === 'text' && !prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required for text-to-video' },
        { status: 400 }
      )
    }

    if (mode === 'image' && !imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Image is required for image-to-video' },
        { status: 400 }
      )
    }

    // Check which AI service is configured
    const falApiKey = process.env.FAL_KEY
    const replicateApiToken = process.env.REPLICATE_API_TOKEN

    // Option 1: Using fal.ai (Recommended - easy to set up)
    if (falApiKey) {
      try {
        const fal = require('@fal-ai/serverless-client')
        fal.config({
          credentials: falApiKey,
        })

        let result
        if (mode === 'text') {
          // Text-to-video using fal.ai
          // Using a working model for text-to-video
          result = await fal.subscribe('fal-ai/stability-video', {
            input: {
              prompt: prompt,
              num_frames: 25,
              num_inference_steps: 50,
            },
            logs: true,
            onQueueUpdate: (update: any) => {
              if (update.status === 'IN_PROGRESS') {
                console.log('Generating video...', update)
              }
            },
          })
        } else {
          // Image-to-video using fal.ai
          result = await fal.subscribe('fal-ai/stability-video', {
            input: {
              image_url: imageUrl,
              prompt: prompt || 'animate this image smoothly',
              num_frames: 25,
              num_inference_steps: 50,
            },
            logs: true,
          })
        }

        return NextResponse.json({
          success: true,
          videoUrl: result.video?.url || result.video || result,
        })
      } catch (falError: any) {
        console.error('fal.ai error:', falError)
        return NextResponse.json({
          success: false,
          error: `fal.ai error: ${falError.message}`,
        }, { status: 500 })
      }
    }

    // Option 2: Using Replicate API
    if (replicateApiToken) {
      try {
        // Install replicate if not already: npm install replicate
        const Replicate = require('replicate')
        const replicate = new Replicate({
          auth: replicateApiToken,
        })

        let output
        if (mode === 'text') {
          // Text-to-video using Replicate
          // Using a popular text-to-video model
          output = await replicate.run(
            'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e0a0f3a6c9b5b5b5b5b5b5b5b5',
            { input: { prompt } }
          )
        } else {
          // Image-to-video using Replicate
          output = await replicate.run(
            'lucataco/animate-lcm:42a996d39a0a3b5c5c5c5c5c5c5c5c5c5c5c5c5c5c',
            { input: { image: imageUrl, prompt: prompt || 'animate' } }
          )
        }

        return NextResponse.json({
          success: true,
          videoUrl: Array.isArray(output) ? output[0] : output,
        })
      } catch (replicateError: any) {
        console.error('Replicate error:', replicateError)
        return NextResponse.json({
          success: false,
          error: `Replicate error: ${replicateError.message}`,
        }, { status: 500 })
      }
    }

    // No API key configured - return helpful error message
    return NextResponse.json({
      success: false,
      error: 'AI video generation service not configured',
      message: 'Please add either FAL_KEY or REPLICATE_API_TOKEN to your .env.local file',
      instructions: {
        fal: 'Get your API key from https://fal.ai/dashboard and add FAL_KEY=your-key to .env.local',
        replicate: 'Get your API token from https://replicate.com/account/api-tokens and add REPLICATE_API_TOKEN=your-token to .env.local',
      },
    }, { status: 400 })

  } catch (error: any) {
    console.error('Error in generate-video API:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate video' },
      { status: 500 }
    )
  }
}

