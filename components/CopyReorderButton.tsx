'use client'
import { useState } from 'react'

type Product = {
    name: string
    currentStock: number
    reorderThreshold: number
    avgDailySales: number | null
    unit: string
    category: string | null
    supplier: string | null
    supplierPhone: string | null
}

function getDayName(daysFromNow: number): string {
    const date = new Date()
    date.setDate(date.getDate() + daysFromNow)
    return date.toLocaleDateString('en-US', { weekday: 'long' })
}

function formatReorderList(products: Product[]): string {
    // Build supplier groups as a plain array to avoid object iteration issues
    const supplierNames: string[] = []
    const supplierMap: Record<string, { phone: string; items: Product[] }> = {}

    products.forEach(p => {
        const key = p.supplier ? p.supplier : 'Unknown Supplier'
        const phone = p.supplierPhone ? p.supplierPhone : ''
        if (!supplierMap[key]) {
            supplierNames.push(key)
            supplierMap[key] = { phone, items: [] }
        }
        supplierMap[key].items.push(p)
    })

    let text = '🛒 Reorder List\n'
    text += 'Generated: ' + new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) + '\n'

    supplierNames.forEach(supplierName => {
        const group = supplierMap[supplierName]
        text += '\n📞 ' + supplierName
        if (group.phone) text += ' — ' + group.phone
        text += '\n'

        group.items.forEach(p => {
            const dailySales = p.avgDailySales && p.avgDailySales > 0 ? p.avgDailySales : 1
            const daysLeft = Math.floor(p.currentStock / dailySales)
            let runsOut = ''
            if (p.currentStock <= 0) {
                runsOut = 'OUT OF STOCK'
            } else if (daysLeft === 0) {
                runsOut = 'runs out today'
            } else {
                runsOut = 'runs out ' + getDayName(daysLeft)
            }
            text += '  • ' + p.name + ' (' + p.currentStock + ' ' + p.unit + ' left — ' + runsOut + ')\n'
        })
    })

    return text.trim()
}

export function CopyReorderButton({ products }: { products: Product[] }) {
    const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')

    async function handleCopy() {
        const text = formatReorderList(products)
        try {
            await navigator.clipboard.writeText(text)
            setStatus('copied')
            setTimeout(() => setStatus('idle'), 2500)
        } catch {
            setStatus('error')
            setTimeout(() => setStatus('idle'), 2500)
        }
    }

    return (
        <button
            onClick={handleCopy}
            className={
                'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all ' +
                (status === 'copied'
                    ? 'bg-green-50 text-green-700 border-green-300'
                    : status === 'error'
                        ? 'bg-red-50 text-red-700 border-red-300'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50')
            }
        >
            {status === 'copied' ? '✓ Copied!' : status === 'error' ? '✗ Failed — try again' : '📋 Copy Reorder List'}
        </button>
    )
}