'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavLinks() {
    const pathname = usePathname()

    const links = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/products', label: 'Products' },
    ]

    return (
        <div className="flex gap-1 text-sm">
            {links.map(({ href, label }) => {
                const active = pathname.startsWith(href)
                return (
                    <Link
                        key={href}
                        href={href}
                        className={`px-3 py-1.5 rounded-md transition-colors font-medium
              ${active
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                    >
                        {label}
                    </Link>
                )
            })}
        </div>
    )
}
