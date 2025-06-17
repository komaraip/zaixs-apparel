import { getUser } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import prisma from "../../../../../lib/prisma"

export async function PUT(request: NextRequest) {
    try {
        const { session, user } = await getUser()

        if (!session || user.role !== 'customer') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { name, email } = await request.json()

        // Check if email is already taken by another user
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser && existingUser.id !== user.id) {
            return NextResponse.json(
                { message: 'Email is already taken' },
                { status: 400 }
            )
        }

        // Update user profile
        await prisma.user.update({
            where: { id: user.id },
            data: {
                name,
                email
            }
        })

        return NextResponse.json(
            { message: 'Profile updated successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Update profile error:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
