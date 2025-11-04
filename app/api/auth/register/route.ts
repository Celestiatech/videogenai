import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { sendEmail, emailTemplates } from '@/lib/email'

// In production, use a real database. For demo, this is in-memory
// Replace with your database implementation
const users: Array<{ id: string; email: string; password: string; name: string }> = [
  {
    id: '1',
    email: 'demo@example.com',
    password: bcrypt.hashSync('demo123', 10),
    name: 'Demo User',
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user (in production, save to database)
    const newUser = {
      id: String(users.length + 1),
      email,
      password: hashedPassword,
      name,
    }

    users.push(newUser)

    // Send welcome email
    try {
      const welcomeEmail = emailTemplates.welcome(name)
      await sendEmail({
        to: email,
        subject: welcomeEmail.subject,
        html: welcomeEmail.html,
      })
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail registration if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Registration failed' },
      { status: 500 }
    )
  }
}
