import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import SettingsForm from './_components/settings-form'
import Link from 'next/link'

export default async function SettingsPage() {
    const { session, user } = await getUser()

    if (!session || user.role !== 'customer') {
        redirect('/sign-in')
    }

    return (        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container max-w-4xl mx-auto px-4">
                {/* Back Button */}
                <div className="mb-6">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
                        <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
                    </div>
                    <div className="p-6">
                        <SettingsForm user={user} />
                    </div>
                </div>
            </div>
        </div>
    )
}
