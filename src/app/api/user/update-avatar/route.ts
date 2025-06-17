import { getUser } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function PUT(request: NextRequest) {
    try {
        const { session, user } = await getUser()

        if (!session || user.role !== 'customer') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const formData = await request.formData()
        const file = formData.get('avatar') as File

        if (!file) {
            return NextResponse.json(
                { message: 'No file uploaded' },
                { status: 400 }
            )
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { message: 'File must be an image' },
                { status: 400 }
            )
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024 // 5MB in bytes
        if (file.size > maxSize) {
            return NextResponse.json(
                { message: 'File size must be less than 5MB' },
                { status: 400 }
            )
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create unique filename
        const timestamp = Date.now()
        const extension = file.name.split('.').pop()
        const filename = `avatar_${user.id}_${timestamp}.${extension}`

        // Ensure uploads directory exists
        const uploadsDir = join(process.cwd(), 'public', 'uploads', 'avatars')
        try {
            await mkdir(uploadsDir, { recursive: true })
        } catch (error) {
            // Directory might already exist, which is fine
        }

        // Save file
        const filepath = join(uploadsDir, filename)
        await writeFile(filepath, buffer)        
        
        // Update user avatar in database
        const avatarUrl = `/uploads/avatars/${filename}`
        
        // TODO: Uncomment after running migration: npx prisma migrate dev --name add_user_avatar
        await prisma.user.update({
            where: { id: user.id },
            data: {
                avatar: avatarUrl
            }
        })

        return NextResponse.json(
            { 
                message: 'Avatar updated successfully',
                avatarUrl 
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Update avatar error:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
