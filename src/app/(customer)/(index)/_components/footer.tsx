import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-[#0D5CD7] pt-[60px] pb-[30px]">
            <div className="container max-w-[1130px] mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-[40px] mb-[50px]">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-[20px]">
                        <div className="flex shrink-0">
                            <Image src="/assets/logos/logoza.png" alt="Zaixs Apparel" width={157} height={42} />
                        </div>
                        <p className="text-white/80 text-sm leading-[24px]">
                            Premium quality apparel with cutting-edge technology. 
                            Working faster 10x with our innovative products.
                        </p>
                        <div className="flex items-center gap-[12px]">
                            <div className="w-8 h-8 flex shrink-0 bg-white/10 rounded-full items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                                <Image src="/assets/icons/global.svg" alt="website" width={16} height={16} />
                            </div>
                            <div className="w-8 h-8 flex shrink-0 bg-white/10 rounded-full items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                                <Image src="/assets/icons/sms.svg" alt="email" width={16} height={16} />
                            </div>
                            <div className="w-8 h-8 flex shrink-0 bg-white/10 rounded-full items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                                <Image src="/assets/icons/call.svg" alt="phone" width={16} height={16} />
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="flex flex-col gap-[20px]">
                        <h3 className="font-bold text-lg text-white">Products</h3>
                        <div className="flex flex-col gap-[12px]">
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors flex items-center gap-[8px]">
                                <Image src="/assets/icons/mobile.svg" alt="" width={16} height={16} />
                                Mobile Phones
                            </Link>
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors flex items-center gap-[8px]">
                                <Image src="/assets/icons/monitor.svg" alt="" width={16} height={16} />
                                Laptops & Computers
                            </Link>
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors flex items-center gap-[8px]">
                                <Image src="/assets/icons/watch.svg" alt="" width={16} height={16} />
                                Smart Watches
                            </Link>
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors flex items-center gap-[8px]">
                                <Image src="/assets/icons/airpods.svg" alt="" width={16} height={16} />
                                Audio Devices
                            </Link>
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors flex items-center gap-[8px]">
                                <Image src="/assets/icons/game.svg" alt="" width={16} height={16} />
                                Gaming
                            </Link>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className="flex flex-col gap-[20px]">
                        <h3 className="font-bold text-lg text-white">Support</h3>
                        <div className="flex flex-col gap-[12px]">
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors">
                                Help Center
                            </Link>
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors">
                                Contact Us
                            </Link>
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors">
                                Warranty Policy
                            </Link>
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors">
                                Return & Exchange
                            </Link>
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors">
                                Shipping Info
                            </Link>
                        </div>
                    </div>

                    {/* Company Section */}
                    <div className="flex flex-col gap-[20px]">
                        <h3 className="font-bold text-lg text-white">Company</h3>
                        <div className="flex flex-col gap-[12px]">
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors">
                                About Us
                            </Link>
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors">
                                Careers
                            </Link>
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors">
                                Press
                            </Link>
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-white/80 text-sm hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border-t border-white/20 pt-[30px] mb-[30px]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-[20px]">
                        <div className="flex flex-col gap-[8px]">
                            <h4 className="font-bold text-lg text-white">Stay Updated</h4>
                            <p className="text-white/80 text-sm">Get the latest deals and product updates</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-white/10 rounded-full p-[12px_20px] gap-[10px]">
                                <Image src="/assets/icons/sms.svg" alt="email" width={20} height={20} />
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="bg-transparent text-white placeholder:text-white/60 outline-none text-sm flex-1 min-w-[200px]"
                                />
                            </div>
                            <button className="p-[12px_24px] rounded-full font-semibold bg-[#FFC736] text-[#0D5CD7] hover:bg-[#FFD666] transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/20 pt-[30px]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-[20px]">
                        <div className="flex items-center gap-[20px]">
                            <p className="text-white/80 text-sm">© 2025 Zaixs Apparel. All rights reserved.</p>
                        </div>
                        <div className="flex items-center gap-[30px]">
                            <div className="flex items-center gap-[10px]">
                                <Image src="/assets/icons/tick-circle.svg" alt="verified" width={20} height={20} />
                                <p className="text-white/80 text-sm">Verified Store</p>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <Image src="/assets/icons/like.svg" alt="trusted" width={20} height={20} />
                                <p className="text-white/80 text-sm">Trusted by 10k+ customers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
