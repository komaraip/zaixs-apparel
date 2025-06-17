import { getUser, lucia } from '@/lib/auth'
import { NextResponse } from 'next/server'
import prisma from "../../../../../lib/prisma"
import { cookies } from 'next/headers'

export async function DELETE() {
    try {
        const { session, user } = await getUser()

        if (!session || user.role !== 'customer') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Delete user's orders and related data first (due to foreign key constraints)
        await prisma.orderProduct.deleteMany({
            where: {
                order: {
                    user_id: user.id
                }
            }
        })

        await prisma.orderDetail.deleteMany({
            where: {
                order: {
                    user_id: user.id
                }
            }
        })

        await prisma.order.deleteMany({
            where: {
                user_id: user.id
            }
        })

        // Delete user sessions
        await prisma.session.deleteMany({
            where: {
                userId: user.id
            }
        })

        // Finally delete the user
        await prisma.user.delete({
            where: {
                id: user.id
            }
        })

        // Invalidate current session
        await lucia.invalidateSession(session.id)

        // Clear session cookie
        const sessionCookie = lucia.createBlankSessionCookie()
        ;(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        return NextResponse.json(
            { message: 'Account deleted successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Delete account error:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
