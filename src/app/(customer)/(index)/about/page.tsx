import React from 'react'
import Image from 'next/image'
import Navbar from '../_components/navbar'

export default function AboutPage() {
    return (
        <>
            <header className="bg-[#EFF3FA] pt-[30px] h-[351px] -mb-[181px]">
                    <Navbar />
            </header>

            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-[#0D5CD7] to-blue-600 text-white py-20">
                    <div className="container max-w-6xl mx-auto px-4 text-center">
                        <h1 className="text-5xl font-bold mb-6">About Zaixs Apparel</h1>
                        <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                            Crafting premium apparel with passion, innovation, and a commitment to quality 
                            that defines modern fashion excellence.
                        </p>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-16">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                                <p className="text-gray-600 mb-4">
                                    Founded with a vision to revolutionize the fashion industry, Zaixs Apparel 
                                    has been at the forefront of creating exceptional clothing that combines 
                                    comfort, style, and sustainability.
                                </p>
                                <p className="text-gray-600 mb-4">
                                    Since our inception, we've been committed to using the finest materials 
                                    and employing skilled craftspeople who share our passion for excellence. 
                                    Every piece in our collection tells a story of dedication and artistry.
                                </p>
                                <p className="text-gray-600">
                                    Today, we continue to push boundaries, embracing innovation while 
                                    staying true to our core values of quality, integrity, and customer satisfaction.
                                </p>
                            </div>
                            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    src="/assets/photos/about-story.jpg"
                                    alt="Our Story"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 bg-white">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                The principles that guide everything we do and shape our commitment to excellence.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-[#0D5CD7] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality First</h3>
                                <p className="text-gray-600">
                                    We never compromise on quality. Every product undergoes rigorous testing 
                                    to ensure it meets our high standards.
                                </p>
                            </div>

                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-[#FFC736] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
                                <p className="text-gray-600">
                                    We're committed to environmental responsibility, using eco-friendly 
                                    materials and sustainable production practices.
                                </p>
                            </div>

                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Focus</h3>
                                <p className="text-gray-600">
                                    Our customers are at the heart of everything we do. We listen, learn, 
                                    and continuously improve to exceed expectations.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                The talented individuals who bring passion and expertise to everything we create.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                                    <Image
                                        src="/assets/photos/team-1.jpg"
                                        alt="Sarah Johnson"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Johnson</h3>
                                <p className="text-[#0D5CD7] font-medium mb-2">Founder & CEO</p>
                                <p className="text-gray-600 text-sm">
                                    Visionary leader with 15+ years in fashion industry, 
                                    passionate about sustainable fashion.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                                    <Image
                                        src="/assets/photos/team-2.jpg"
                                        alt="Michael Chen"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Michael Chen</h3>
                                <p className="text-[#0D5CD7] font-medium mb-2">Head of Design</p>
                                <p className="text-gray-600 text-sm">
                                    Creative genius behind our innovative designs, 
                                    bringing fresh perspectives to modern fashion.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                                    <Image
                                        src="/assets/photos/team-3.jpg"
                                        alt="Emily Rodriguez"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Emily Rodriguez</h3>
                                <p className="text-[#0D5CD7] font-medium mb-2">Quality Manager</p>
                                <p className="text-gray-600 text-sm">
                                    Ensures every product meets our exceptional standards 
                                    through meticulous quality control processes.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-[#0D5CD7] text-white">
                    <div className="container max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Experience Quality?</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Discover our latest collection and join thousands of satisfied customers 
                            who trust Zaixs Apparel for their fashion needs.
                        </p>
                        <div className="space-x-4">
                            <a 
                                href="/catalogs" 
                                className="inline-block bg-[#FFC736] text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
                            >
                                Shop Now
                            </a>
                            <a 
                                href="/contact" 
                                className="inline-block bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#0D5CD7] transition-colors"
                            >
                                Get In Touch
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
        
    )
}
