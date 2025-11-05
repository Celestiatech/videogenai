import { NextRequest, NextResponse } from 'next/server'


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

    // Try fal.ai first if configured, then fall back to Replicate if fal.ai fails
    let falResult: any = null
    let falFailed = false
    
    // Option 1: Using fal.ai (Recommended - easy to set up)
    if (falApiKey) {
      try {
        // Use the fal.ai client library with workaround for model IDs with slashes
        const fal = require('@fal-ai/serverless-client')
        
        fal.config({
          credentials: falApiKey,
          host: process.env.FAL_HOST || 'gateway.alpha.fal.ai',
        })
        
        // Helper to call fal API with proper URL construction
        // NOTE: The fal.ai client library has a known issue with model IDs containing slashes
        // This is a workaround that tries multiple approaches
        const callFalApi = async (modelId: string, input: any) => {
          const host = process.env.FAL_HOST || 'gateway.alpha.fal.ai'
          
          // Try 1: Use model ID directly (works for models without slashes)
          if (!modelId.includes('/')) {
            try {
              console.log(`Attempting to call model ${modelId} directly`)
              const result = await fal.subscribe(modelId, {
                input: input,
                logs: true,
                onQueueUpdate: (update: any) => {
                  if (update.status === 'IN_PROGRESS') {
                    console.log('Generating video...', update)
                  }
                },
              })
              console.log(`Successfully called model ${modelId}`)
              return result
            } catch (error: any) {
              // Extract error details from various possible locations
              const errorCode = error.code || error.cause?.code || error.details?.code || error.errno
              const errorHostname = error.hostname || error.cause?.hostname || error.details?.hostname
              const errorSyscall = error.syscall || error.cause?.syscall
              
              const errorDetails = {
                message: error.message,
                code: errorCode,
                errno: error.errno,
                syscall: errorSyscall,
                hostname: errorHostname,
                cause: error.cause,
                details: error.details,
                fullError: JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
              }
              console.error(`Error calling model ${modelId}:`, errorDetails)
              
              // Create a more descriptive error message
              let descriptiveError = error.message
              if (errorCode === 'EAI_AGAIN' || errorCode === 'ENOTFOUND') {
                descriptiveError = `DNS resolution failed for ${errorHostname || 'gateway'}. Model may not exist or gateway URL is incorrect.`
              } else if (errorCode === 'DEPTH_ZERO_SELF_SIGNED_CERT') {
                descriptiveError = `SSL certificate error. The gateway URL may be incorrect.`
              } else if (errorCode) {
                descriptiveError = `${error.message} (code: ${errorCode})`
              }
              
              const enhancedError = new Error(descriptiveError)
              ;(enhancedError as any).originalError = error
              ;(enhancedError as any).errorDetails = errorDetails
              ;(enhancedError as any).code = errorCode
              throw enhancedError
            }
          }
          
          // Try 2: For models with slashes, construct URL manually
          // The gateway expects: https://{modelId}.{host} where slashes are replaced with dots
          const gatewayModelId = modelId.replace(/\//g, '.')
          const fullUrl = `https://${gatewayModelId}.${host}`
          
          console.log(`Model ID contains slashes, using gateway URL: ${fullUrl}`)
          
          try {
            return await fal.subscribe(fullUrl, {
              input: input,
              logs: true,
              onQueueUpdate: (update: any) => {
                if (update.status === 'IN_PROGRESS') {
                  console.log('Generating video...', update)
                }
              },
            })
          } catch (error: any) {
            // If that fails, the model ID format is incompatible with the client library
            throw new Error(
              `Model ID "${modelId}" contains slashes which the fal.ai client library cannot handle. ` +
              `This is a known limitation. Please use a model without slashes or contact fal.ai support. ` +
              `Original error: ${error.message}`
            )
          }
        }

        let result
        if (mode === 'text') {
          // Text-to-video using fal.ai
          // Models from: https://fal.ai/models
          // Note: Try models without slashes first, as they work better with the client library
          const models = [
            // Try standard Veo 3.1 first (no slashes - should work)
            { 
              id: 'veo3.1', 
              params: { 
                prompt: prompt,
              } 
            },
            // Then try Veo 3.1 Fast (has slashes - may need special handling)
            { 
              id: 'veo3.1/fast', 
              params: { 
                prompt: prompt,
              } 
            },
            // Sora 2 (high quality)
            { 
              id: 'sora-2/text-to-video', 
              params: { 
                prompt: prompt,
              } 
            },
            // Kling 2.5 Turbo Pro (professional quality)
            { 
              id: 'kling-video/v2.5-turbo/pro/text-to-video', 
              params: { 
                prompt: prompt,
              } 
            },
          ]
          
          let lastError: any = null
          const errors: string[] = []
          for (const model of models) {
            try {
              console.log(`Trying model: ${model.id}`)
              result = await callFalApi(model.id, model.params)
              console.log(`✅ Success with model: ${model.id}`)
              break
            } catch (error: any) {
              // Get the most descriptive error message
              const errorMsg = error.originalError?.message || error.message || 'Unknown error'
              const errorCode = error.errorDetails?.code || error.code || ''
              const fullErrorMsg = errorCode ? `${model.id}: ${errorMsg} (${errorCode})` : `${model.id}: ${errorMsg}`
              console.log(`❌ Model ${model.id} failed:`, errorMsg, errorCode ? `(${errorCode})` : '')
              errors.push(fullErrorMsg)
              lastError = error
              continue
            }
          }
          
          if (!result) {
            // If fal.ai fails, try Replicate as fallback if available
            if (replicateApiToken) {
              console.log('fal.ai failed, will try Replicate API as fallback')
              falFailed = true
            } else {
              const combinedErrors = errors.length > 0 
                ? `All models failed:\n${errors.join('\n')}`
                : 'All video generation models failed'
              throw new Error(combinedErrors)
            }
          } else {
            falResult = result
          }
        }
        
        // If we got a result from fal.ai, return it
        if (falResult && !falFailed) {
          const resultAny = falResult as any
          const videoUrl = resultAny.video?.url || 
                          resultAny.video || 
                          resultAny.url || 
                          (Array.isArray(resultAny) ? resultAny[0] : resultAny)

          if (videoUrl) {
            return NextResponse.json({
              success: true,
              videoUrl: videoUrl,
            })
          } else {
            console.error('No video URL in fal.ai result, will try Replicate if available')
            falFailed = true
          }
        }
        
        if (mode === 'image') {
          // Image-to-video using fal.ai REST API directly
          // Models from: https://fal.ai/models
          const imageModels = [
            // Veo 3.1 Fast (faster and more cost-effective)
            { 
              id: 'veo3.1/fast/image-to-video', 
              params: { 
                image_url: imageUrl, 
                prompt: prompt || 'animate this image smoothly',
              } 
            },
            // Standard Veo 3.1
            { 
              id: 'veo3.1/image-to-video', 
              params: { 
                image_url: imageUrl, 
                prompt: prompt || 'animate this image smoothly',
              } 
            },
            // Sora 2 (high quality)
            { 
              id: 'sora-2/image-to-video', 
              params: { 
                image_url: imageUrl, 
                prompt: prompt || 'animate this image smoothly',
              } 
            },
            // Kling 2.5 Turbo Pro (professional quality)
            { 
              id: 'kling-video/v2.5-turbo/pro/image-to-video', 
              params: { 
                image_url: imageUrl, 
                prompt: prompt || 'animate this image smoothly',
              } 
            },
            // PixVerse v5 (good quality)
            { 
              id: 'pixverse/v5/image-to-video', 
              params: { 
                image_url: imageUrl, 
                prompt: prompt || 'animate this image smoothly',
              } 
            },
          ]
          
          let lastImgError: any = null
          const imgErrors: string[] = []
          for (const model of imageModels) {
            try {
              console.log(`Trying image model: ${model.id}`)
              result = await callFalApi(model.id, model.params)
              console.log(`✅ Success with image model: ${model.id}`)
              break
            } catch (error: any) {
              const errorMsg = error.originalError?.message || error.message || 'Unknown error'
              const errorCode = error.errorDetails?.code || error.code || ''
              const fullErrorMsg = errorCode ? `${model.id}: ${errorMsg} (${errorCode})` : `${model.id}: ${errorMsg}`
              console.log(`❌ Image model ${model.id} failed:`, errorMsg, errorCode ? `(${errorCode})` : '')
              imgErrors.push(fullErrorMsg)
              lastImgError = error
              continue
            }
          }
          
          if (!result) {
            // If fal.ai fails, try Replicate as fallback if available
            if (replicateApiToken) {
              console.log('fal.ai image-to-video failed, will try Replicate API as fallback')
              falFailed = true
            } else {
              const combinedErrors = imgErrors.length > 0 
                ? `All image-to-video models failed:\n${imgErrors.join('\n')}`
                : 'All image-to-video models failed'
              throw new Error(combinedErrors)
            }
          } else {
            falResult = result
          }
        }
        
        // If we got a result from fal.ai, return it
        if (falResult && !falFailed) {
          const resultAny = falResult as any
          const videoUrl = resultAny.video?.url || 
                          resultAny.video || 
                          resultAny.url || 
                          (Array.isArray(resultAny) ? resultAny[0] : resultAny)

          if (videoUrl) {
            return NextResponse.json({
              success: true,
              videoUrl: videoUrl,
            })
          } else {
            console.error('No video URL in fal.ai result, will try Replicate if available')
            falFailed = true
          }
        }
      } catch (falError: any) {
        console.error('fal.ai error details:', {
          message: falError.message,
          stack: falError.stack,
          response: falError.response,
          status: falError.status,
          statusCode: falError.statusCode,
          cause: falError.cause,
          body: falError.body,
        })
        
        // If Replicate is available, try it as fallback instead of failing
        if (replicateApiToken) {
          console.log('fal.ai failed, falling back to Replicate API')
          falFailed = true
        } else {
          // No fallback available, return error
          const errorMessage = falError.message || 'Unknown error'
          return NextResponse.json({
            success: false,
            error: `fal.ai error: ${errorMessage}`,
            statusCode: 500,
            details: 'Check server logs for more details',
            troubleshooting: {
              checkApiKey: 'Verify FAL_KEY in .env.local matches your fal.ai API key',
              checkModels: 'Visit https://fal.ai/models to see available video generation models',
              checkParameters: 'Review the model documentation for required parameters',
              checkNetwork: 'Ensure your server can reach fal.ai servers',
            },
          }, { status: 500 })
        }
      }
    }

    // Option 2: Using Replicate API (as primary or fallback)
    if (replicateApiToken && (falFailed || !falApiKey)) {
      try {
        const Replicate = require('replicate')
        const replicate = new Replicate({
          auth: replicateApiToken,
        })

        // Helper function to run Replicate model with retry logic and progress tracking
        const runWithRetryAndProgress = async (model: string, input: any, maxRetries: number = 3): Promise<any> => {
          for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
              const startTime = Date.now()
              console.log(`Starting prediction for model ${model} (attempt ${attempt + 1}/${maxRetries})`)
              
              // Use replicate.run() which handles model resolution and polling automatically
              // This is simpler and more reliable than manual prediction creation
              const output = await replicate.run(model, {
                input: input
              })
              
              const totalTime = (Date.now() - startTime) / 1000 // seconds
              console.log(`✅ Model ${model} completed successfully in ${Math.floor(totalTime)}s`)
              
              // Return both output and metadata
              return {
                output: output,
                metadata: {
                  model: model,
                  generationTime: Math.floor(totalTime),
                  status: 'completed'
                }
              }
            } catch (error: any) {
              const errorMsg = error.message || ''
              
              // Check if it's a rate limit error (429)
              if ((errorMsg.includes('429') || errorMsg.includes('Too Many Requests') || errorMsg.includes('rate limit')) && attempt < maxRetries - 1) {
                // Extract retry_after from error message if available
                const retryMatch = errorMsg.match(/resets in ~(\d+)s/i) || errorMsg.match(/retry_after[":\s]*(\d+)/i)
                const retrySeconds = retryMatch ? parseInt(retryMatch[1]) : (attempt + 1) * 10 // Default: 10s, 20s, 30s
                
                console.log(`Rate limit hit for model ${model}. Waiting ${retrySeconds} seconds before retry (attempt ${attempt + 1}/${maxRetries})...`)
                await new Promise(resolve => setTimeout(resolve, retrySeconds * 1000))
                continue
              }
              
              // Check if it's a 404 (model not found) - don't retry these
              if (errorMsg.includes('404') || errorMsg.includes('Not Found')) {
                console.log(`Model ${model} not found (404), skipping to next model`)
                throw error
              }
              
              // If not a rate limit or max retries reached, throw the error
              throw error
            }
          }
          throw new Error('Max retries exceeded')
        }

        let output
        if (mode === 'text') {
          // Text-to-video using Replicate
          // Try multiple text-to-video models
          // replicate.run() will automatically resolve to latest version
          const textModels = [
            'anotherjesse/zeroscope-v2-xl',  // High quality, popular model
            'anotherjesse/zeroscope-v2-576w',  // Faster version
          ]
          
          let lastError: any = null
          for (const model of textModels) {
            try {
              console.log(`Trying Replicate model: ${model}`)
              output = await runWithRetryAndProgress(model, { prompt })
              console.log(`✅ Success with Replicate model: ${model}`)
              break
            } catch (error: any) {
              console.log(`Replicate model ${model} failed:`, error.message)
              lastError = error
              continue
            }
          }
          
          if (!output) {
            throw lastError || new Error('All Replicate text-to-video models failed')
          }
        } else {
          // Image-to-video using Replicate
          // replicate.run() will automatically resolve to latest version
          const imageModels = [
            'lucataco/animate-lcm',  // Fast image animation
            'anotherjesse/zeroscope-v2-xl',  // High quality
          ]
          
          let lastImgError: any = null
          for (const model of imageModels) {
            try {
              console.log(`Trying Replicate image model: ${model}`)
              output = await runWithRetryAndProgress(model, { 
                image: imageUrl, 
                prompt: prompt || 'animate this image smoothly' 
              })
              console.log(`✅ Success with Replicate image model: ${model}`)
              break
            } catch (error: any) {
              console.log(`Replicate image model ${model} failed:`, error.message)
              lastImgError = error
              continue
            }
          }
          
          if (!output) {
            throw lastImgError || new Error('All Replicate image-to-video models failed')
          }
        }

        // Extract video URL and metadata from Replicate output
        const videoOutput = output.output || output
        const metadata = output.metadata || {}
        const videoUrl = Array.isArray(videoOutput) ? videoOutput[0] : videoOutput

        if (!videoUrl) {
          return NextResponse.json({
            success: false,
            error: 'Video generation completed but no video URL was returned',
            debug: output,
          }, { status: 500 })
        }

        return NextResponse.json({
          success: true,
          videoUrl: videoUrl,
          metadata: {
            generationTime: metadata.generationTime || 'N/A',
            predictionId: metadata.predictionId || 'N/A',
            status: metadata.status || 'completed'
          }
        })
      } catch (replicateError: any) {
        console.error('Replicate error details:', {
          message: replicateError.message,
          status: replicateError.status,
          response: replicateError.response,
        })
        
        // Provide helpful error messages
        let errorMessage = replicateError.message || 'Unknown error'
        let statusCode = 500
        let helpfulMessage = ''
        
        if (errorMessage.includes('429') || errorMessage.includes('Too Many Requests')) {
          statusCode = 429
          helpfulMessage = 'Rate limit exceeded. Free tier allows 6 requests per minute. Add a payment method to Replicate for higher limits, or wait a few seconds and try again.'
        } else if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
          statusCode = 401
          helpfulMessage = 'Authentication failed. Please verify your REPLICATE_API_TOKEN is correct.'
        } else if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
          statusCode = 404
          helpfulMessage = 'Model not found. The model may not exist or the name may be incorrect.'
        }
        
        return NextResponse.json({
          success: false,
          error: `Replicate error: ${errorMessage}`,
          statusCode: statusCode,
          details: helpfulMessage || (replicateError.response?.data || 'Check server logs for more details'),
          troubleshooting: {
            rateLimit: 'Free tier: 6 requests/min. Add payment method for higher limits at https://replicate.com/account/billing',
            checkApiKey: 'Verify REPLICATE_API_TOKEN in .env.local matches your Replicate token',
            checkModels: 'Visit https://replicate.com/models to see available video generation models',
          },
        }, { status: statusCode })
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

