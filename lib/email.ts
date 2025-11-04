import nodemailer from 'nodemailer'

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"AI Video Generator" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to,
      subject,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      html,
    })

    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}

// Email templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Welcome to AI Video Generator!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8b5cf6;">Welcome to AI Video Generator!</h1>
        <p>Hi ${name},</p>
        <p>Thank you for joining AI Video Generator. You're all set to start creating amazing videos with AI!</p>
        <p>Get started by creating your first video today.</p>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="display: inline-block; background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px;">Start Creating</a>
      </div>
    `,
  }),

  paymentSuccess: (planName: string, amount: number, paymentId: string) => ({
    subject: 'Payment Successful - AI Video Generator',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10b981;">Payment Successful!</h1>
        <p>Thank you for your subscription.</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Plan:</strong> ${planName}</p>
          <p><strong>Amount:</strong> ₹${(amount / 100).toFixed(2)}</p>
          <p><strong>Payment ID:</strong> ${paymentId}</p>
        </div>
        <p>Your account has been upgraded successfully. You can now enjoy all the premium features!</p>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard" style="display: inline-block; background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px;">Go to Dashboard</a>
      </div>
    `,
  }),

  passwordReset: (resetLink: string) => ({
    subject: 'Reset Your Password - AI Video Generator',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8b5cf6;">Reset Your Password</h1>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" style="display: inline-block; background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">This link will expire in 1 hour.</p>
      </div>
    `,
  }),

  videoReady: (videoUrl: string, prompt: string) => ({
    subject: 'Your Video is Ready! - AI Video Generator',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8b5cf6;">Your Video is Ready!</h1>
        <p>Your AI-generated video has been completed.</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Prompt:</strong> ${prompt}</p>
        </div>
        <a href="${videoUrl}" style="display: inline-block; background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px;">View Video</a>
      </div>
    `,
  }),
}

