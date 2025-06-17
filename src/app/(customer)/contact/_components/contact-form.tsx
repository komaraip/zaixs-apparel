'use client'

import { useState } from 'react'

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage('')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setMessage('Thank you for your message! We\'ll get back to you soon.')
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                })
            } else {
                setMessage('Sorry, there was an error sending your message. Please try again.')
            }
        } catch (error) {
            setMessage('Sorry, there was an error sending your message. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {message && (
                <div className={`p-4 rounded-md mb-6 ${
                    message.includes('Thank you') 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D5CD7] focus:border-transparent"
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D5CD7] focus:border-transparent"
                            placeholder="your.email@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D5CD7] focus:border-transparent"
                        placeholder="What's this about?"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D5CD7] focus:border-transparent resize-vertical"
                        placeholder="Tell us more about your inquiry..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#0D5CD7] text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    )
}
