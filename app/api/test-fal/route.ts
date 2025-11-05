import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const falApiKey = process.env.FAL_KEY
    
    if (!falApiKey) {
      return NextResponse.json({
        success: false,
        error: 'FAL_KEY not found in environment variables',
      }, { status: 400 })
    }

    // Test API key by making a direct HTTP request to fal.ai
    const https = require('https')
    
    // Try different possible API endpoints
    const endpoints = [
      { hostname: 'api.fal.ai', path: '/v1/models' },
      { hostname: 'gateway.alpha.fal.ai', path: '/models' },
    ]
    
    // Test each endpoint
    for (const endpoint of endpoints) {
      try {
        const result = await new Promise<any>((resolve, reject) => {
          const options = {
            hostname: endpoint.hostname,
            path: endpoint.path,
            method: 'GET',
            headers: {
              'Authorization': `Key ${falApiKey}`,
              'Content-Type': 'application/json',
            },
            timeout: 10000,
          }

          const req = https.request(options, (res: any) => {
            let data = ''
            res.on('data', (chunk: any) => {
              data += chunk
            })
            res.on('end', () => {
              resolve({
                statusCode: res.statusCode,
                data: data,
                endpoint: endpoint.hostname,
              })
            })
          })

          req.on('error', (error: any) => {
            reject({
              error: error.message,
              code: error.code,
              endpoint: endpoint.hostname,
            })
          })

          req.on('timeout', () => {
            req.destroy()
            reject({
              error: 'Request timeout',
              endpoint: endpoint.hostname,
            })
          })

          req.end()
        })

        // If we got a response, check the status
        if (result.statusCode === 200) {
          try {
            const jsonData = JSON.parse(result.data)
            return NextResponse.json({
              success: true,
              message: 'API key is valid! Successfully connected to fal.ai',
              statusCode: result.statusCode,
              endpoint: result.endpoint,
              data: jsonData,
              apiKeyFormat: {
                provided: falApiKey.substring(0, 20) + '...',
                hasKeySecret: falApiKey.includes(':'),
              },
            })
          } catch (e) {
            return NextResponse.json({
              success: true,
              message: 'API key appears to be valid (connected successfully)',
              statusCode: result.statusCode,
              endpoint: result.endpoint,
              rawResponse: result.data.substring(0, 500),
            })
          }
        } else if (result.statusCode === 401) {
          return NextResponse.json({
            success: false,
            error: 'API key authentication failed',
            message: 'The API key appears to be invalid or expired',
            statusCode: result.statusCode,
            endpoint: result.endpoint,
          }, { status: 401 })
        } else {
          // Try next endpoint
          continue
        }
      } catch (error: any) {
        // If DNS/network error, try next endpoint
        if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
          continue
        }
        // Other errors, return them
        return NextResponse.json({
          success: false,
          error: 'Network error',
          message: error.error || error.message,
          details: error.code,
          endpoint: error.endpoint,
          troubleshooting: {
            dnsError: error.code === 'EAI_AGAIN' || error.code === 'ENOTFOUND',
            connectionError: error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT',
            suggestion: error.code === 'EAI_AGAIN' || error.code === 'ENOTFOUND'
              ? 'DNS resolution failed. Check if your server can resolve fal.ai domains.'
              : 'Check network connectivity to fal.ai servers',
          },
        }, { status: 500 })
      }
    }

    // If we get here, all endpoints failed
    return NextResponse.json({
      success: false,
      error: 'All API endpoints failed',
      message: 'Could not connect to any fal.ai endpoints',
      apiKeyFormat: {
        provided: falApiKey.substring(0, 20) + '...',
        hasKeySecret: falApiKey.includes(':'),
      },
      troubleshooting: {
        checkApiKey: 'Verify your FAL_KEY is correct at https://fal.ai/dashboard',
        checkNetwork: 'Ensure your server can reach fal.ai servers',
        checkDNS: 'Test DNS resolution: nslookup api.fal.ai',
      },
    }, { status: 500 })

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error',
      stack: error.stack,
    }, { status: 500 })
  }
}
