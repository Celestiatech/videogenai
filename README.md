# AI Video Generator

A modern, beautiful web application for generating videos using AI. Transform text prompts or images into stunning videos with just a few clicks.

## Features

- 🎬 **Text-to-Video**: Generate videos from text descriptions
- 🖼️ **Image-to-Video**: Animate static images into videos
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- ⚡ **Fast**: Built with Next.js 14 for optimal performance
- 🔌 **Flexible**: Supports multiple AI video generation APIs

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:
```bash
cp .env.local.example .env.local
```

Fill in the required values:
- **NextAuth**: Generate a secret with `openssl rand -base64 32`
- **Razorpay**: Get keys from https://dashboard.razorpay.com/app/keys
- **Email (SMTP)**: Configure your email service (Gmail, SendGrid, etc.)
- **Base URL**: Your production domain

4. Set up your AI video generation API key:

   Choose one of these services:
   
   **Option 1: fal.ai (Recommended)**
   - Sign up at https://fal.ai
   - Get your API key from https://fal.ai/dashboard
   - Add to `.env.local`:
   ```
   FAL_KEY=your-api-key-here
   ```
   - Uncomment the fal.ai integration in `app/api/generate-video/route.ts`

   **Option 2: Replicate**
   - Sign up at https://replicate.com
   - Get your API token from https://replicate.com/account/api-tokens
   - Install: `npm install replicate`
   - Add to `.env.local`:
   ```
   REPLICATE_API_TOKEN=your-token-here
   ```
   - Uncomment the Replicate integration in `app/api/generate-video/route.ts`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

✅ **Authentication System**
- User registration and login
- Secure session management with NextAuth.js
- Protected routes and dashboard

✅ **Paid Memberships**
- Three pricing tiers: Free, Pro, Enterprise
- Indian payment methods via Razorpay
- Payment history tracking
- Subscription management

✅ **Email Functionality**
- Welcome emails for new users
- Payment confirmation emails
- Contact form notifications
- Video ready notifications

✅ **Standard Pages**
- Home page with video generation
- Pricing page with payment integration
- Features, About, Contact pages
- Privacy Policy and Terms of Service
- User Dashboard
- Payment History

✅ **SEO Optimized**
- Comprehensive meta tags
- Open Graph tags
- Twitter cards
- Sitemap.xml
- Robots.txt
- Structured data ready

## API Integration

The app is ready to integrate with multiple AI video generation services:

1. **fal.ai** - Easy setup, good for text-to-video and image-to-video
2. **Replicate** - Wide variety of models, supports many video generation models
3. **Stability AI** - High-quality results
4. **Runway ML** - Professional video generation

Edit `app/api/generate-video/route.ts` and uncomment the integration you want to use, then add your API credentials.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── generate-video/
│   │       └── route.ts          # API endpoint for video generation
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page component
├── public/                       # Static assets
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Customization

- **Styling**: Edit `tailwind.config.js` to customize colors and themes
- **UI Components**: Modify `app/page.tsx` to change the interface
- **API Logic**: Update `app/api/generate-video/route.ts` to add new features

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS
- DigitalOcean

## License

MIT License - feel free to use this project for your own purposes!

## Credits

Built with inspiration from:
- [fal-ai-community/video-starter-kit](https://github.com/fal-ai-community/video-starter-kit)
- [AI Video Generator templates](https://github.com/Hussein3030/AI-Video-Generator)

## Support

For issues and questions:
1. Check the API documentation for your chosen service
2. Ensure your API keys are correctly configured
3. Check the browser console for error messages

---

**Note**: Make sure to add your API keys to `.env.local` and never commit them to version control!

