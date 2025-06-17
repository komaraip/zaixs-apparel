'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

interface UserDropdownProps {
    firstName: string
    lastName?: string
    avatarUrl?: string | null
}

export default function UserDropdown({ firstName, lastName, avatarUrl }: UserDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)        
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/sign-out', {
                method: 'POST'
            })
            
            if (response.ok) {
                window.location.href = '/sign-in'
            }
        } catch (error) {
            console.error('Logout error:', error)
            window.location.href = '/sign-in'
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
                <p className="text-white">Hi, {firstName} {lastName || ''}</p>
                <div className="w-[48px] h-[48px] flex shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden">
                    <Image
                        src={avatarUrl || '/assets/photos/avatar-default.jpg'}
                        className="w-full h-full object-cover rounded-full"
                        alt="photo"
                        width={48}
                        height={48}
                    />
                </div>
                <svg 
                    className={`w-4 h-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                        <Link 
                            href="/settings" 
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Settings
                            </div>
                        </Link>
                        <button 
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Log Out
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
