import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { name, email, subject, message } = await request.json()

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { message: 'All fields are required' },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: 'Please provide a valid email address' },
                { status: 400 }
            )
        }

        // Log the contact form submission (in a real app, you'd save to database or send email)
        console.log('Contact form submission:', {
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString()
        })

        // TODO: In a real application, you would:
        // 1. Save to database
        // 2. Send email notification
        // 3. Send auto-reply to customer
        
        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
