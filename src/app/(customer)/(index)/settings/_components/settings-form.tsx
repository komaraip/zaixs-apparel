'use client'

import { useState } from 'react'
import Image from 'next/image'

interface User {
    id: number
    name: string
    email: string
    avatar?: string | null
}

interface SettingsFormProps {
    user: User
}

export default function SettingsForm({ user }: SettingsFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [avatarPreview, setAvatarPreview] = useState<string | null>(
        user.avatar || '/assets/photos/avatar-default.jpg'
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent, section: string) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage('')

        try {
            let response

            if (section === 'profile') {
                response = await fetch('/api/user/update-profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email
                    })
                })
            } else if (section === 'password') {
                if (formData.newPassword !== formData.confirmPassword) {
                    setMessage('New passwords do not match')
                    setIsLoading(false)
                    return
                }

                response = await fetch('/api/user/update-password', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        currentPassword: formData.currentPassword,
                        newPassword: formData.newPassword
                    })
                })
            }

            if (response?.ok) {
                setMessage('Settings updated successfully!')
                if (section === 'password') {
                    setFormData({
                        ...formData,
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    })
                }
            } else {
                const error = await response?.json()
                setMessage(error.message || 'An error occurred')
            }
        } catch (error) {
            setMessage('An error occurred while updating settings')
        } finally {
            setIsLoading(false)
        }
    }

    const handleAvatarSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage('')

        const fileInput = document.getElementById('avatar') as HTMLInputElement
        const file = fileInput?.files?.[0]

        if (!file) {
            setMessage('Please select an image')
            setIsLoading(false)
            return
        }

        const formData = new FormData()
        formData.append('avatar', file)

        try {
            const response = await fetch('/api/user/update-avatar', {
                method: 'PUT',
                body: formData
            })

            if (response.ok) {
                setMessage('Profile photo updated successfully!')
            } else {
                const error = await response.json()
                setMessage(error.message || 'An error occurred')
            }
        } catch (error) {
            setMessage('An error occurred while updating profile photo')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data.'
        )

        if (!confirmed) return

        setIsLoading(true)
        setMessage('')

        try {
            const response = await fetch('/api/user/delete-account', {
                method: 'DELETE'
            })

            if (response.ok) {
                setMessage('Account deleted successfully. You will be redirected to the homepage.')
                setTimeout(() => {
                    window.location.href = '/'
                }, 2000)
            } else {
                const error = await response.json()
                setMessage(error.message || 'An error occurred while deleting account')
            }
        } catch (error) {
            setMessage('An error occurred while deleting account')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            {message && (
                <div className={`p-4 rounded-md ${
                    message.includes('successfully') 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                    {message}
                </div>
            )}

            {/* Profile Photo Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Photo</h2>
                <form onSubmit={handleAvatarSubmit} className="space-y-4">
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <Image
                                src={avatarPreview || '/assets/photos/avatar-default.jpg'}
                                alt="Profile"
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-2">
                                Choose new photo
                            </label>
                            <input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Updating...' : 'Update Photo'}
                    </button>
                </form>
            </div>

            {/* Profile Information Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                <form onSubmit={(e) => handleSubmit(e, 'profile')} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>

            {/* Password Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
                <form onSubmit={(e) => handleSubmit(e, 'password')} className="space-y-4">
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            required
                            minLength={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            minLength={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>

            {/* Delete Account Section */}
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h2 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h2>
                <p className="text-red-700 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                    {isLoading ? 'Deleting...' : 'Delete Account'}
                </button>
            </div>
        </div>
    )
}
