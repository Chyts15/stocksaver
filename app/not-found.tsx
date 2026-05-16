import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="text-center py-24">
            <p className="text-6xl mb-4">📦</p>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Page not found</h1>
            <p className="text-slate-400 text-sm mb-6">
                The page you're looking for doesn't exist.
            </p>
            <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
            </Link>
        </div>
    )
}
