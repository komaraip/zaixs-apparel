import { lucia, getUser } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
    try {
        const { session } = await getUser()

        if (!session) {
            return NextResponse.json(
                { message: 'Not authenticated' },
                { status: 401 }
            )
        }

        await lucia.invalidateSession(session.id)

        const sessionCookie = lucia.createBlankSessionCookie()
        ;(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        return NextResponse.json(
            { message: 'Signed out successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Sign out error:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
