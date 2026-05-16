import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { NavLinks } from '@/components/NavLinks'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'StockSaver',
    description: 'Never run out of stock again',
    icons: {
        icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-slate-50 min-h-screen`}>
        <nav className="bg-white border-b border-slate-200 px-6 py-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    📦 <span>StockSaver</span>
                </Link>
                <NavLinks />
            </div>
        </nav>
        <main className="max-w-5xl mx-auto px-6 py-8">
            {children}
        </main>
        </body>
        </html>
    )
}