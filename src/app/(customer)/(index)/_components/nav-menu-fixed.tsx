'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
    href: string
    label: string
}

const navItems: NavItem[] = [
    { href: '/', label: 'Home' },
    { href: '/catalogs', label: 'Shop' },
    { href: '/categories', label: 'Categories' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/rewards', label: 'Rewards' }
]

export default function NavMenu() {
    const pathname = usePathname()

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/'
        }
        return pathname.startsWith(href)
    }

    return (
        <ul className="flex items-center gap-[30px]">
            {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                    <li key={item.href}>
                        <Link 
                            href={item.href}
                            className={`relative px-3 py-2 rounded-lg hover:font-bold hover:text-[#FFC736] transition-all duration-300 ${
                                active 
                                    ? 'font-bold text-[#FFC736] bg-white/10' 
                                    : 'text-white hover:bg-white/5'
                            }`}
                        >
                            {item.label}
                            {/* Active indicator dot */}
                            {active && (
                                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#FFC736] rounded-full"></span>
                            )}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
