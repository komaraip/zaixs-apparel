import { getUser } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'
import bcrypt from 'bcrypt'

export async function PUT(request: NextRequest) {
    try {
        const { session, user } = await getUser()

        if (!session || user.role !== 'customer') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { currentPassword, newPassword } = await request.json()

        // Get user with password
        const userWithPassword = await prisma.user.findUnique({
            where: { id: user.id }
        })

        if (!userWithPassword) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            )
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(
            currentPassword,
            userWithPassword.password
        )

        if (!isCurrentPasswordValid) {
            return NextResponse.json(
                { message: 'Current password is incorrect' },
                { status: 400 }
            )
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10)

        // Update password
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedNewPassword
            }
        })

        return NextResponse.json(
            { message: 'Password updated successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Update password error:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
