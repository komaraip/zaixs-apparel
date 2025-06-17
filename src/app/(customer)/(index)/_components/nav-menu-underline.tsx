'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
    href: string
    label: string
}

const navItems: NavItem[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/catalogs', label: 'Shop' },
    { href: '/contact', label: 'Contact' },
]

export default function NavMenuUnderline() {
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
                            className={`relative px-3 py-2 hover:font-bold hover:text-[#FFC736] transition-all duration-300 ${
                                active 
                                    ? 'font-bold text-[#FFC736]' 
                                    : 'text-white'
                            }`}
                        >
                            {item.label}
                            {/* Active underline */}
                            {active && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC736] rounded-full"></span>
                            )}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
