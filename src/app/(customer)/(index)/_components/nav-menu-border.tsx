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

export default function NavMenuBorder() {
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
                            className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                                active 
                                    ? 'font-bold text-[#FFC736] border-[#FFC736]' 
                                    : 'text-white border-transparent hover:border-[#FFC736] hover:text-[#FFC736] hover:font-bold'
                            }`}
                        >
                            {item.label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
