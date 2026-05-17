import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { getStockStatus } from '@/lib/calculations'
import { StockBadge } from '@/components/StockBadge'
import { Button } from '@/components/ui/button'
import { quickRestock } from '@/lib/actions'
import { CopyReorderButton } from '@/components/CopyReorderButton'

export const dynamic = 'force-dynamic'

export default async function DashboardPage({
                                                searchParams,
                                            }: {
    searchParams: Promise<{ category?: string }>
}) {
    noStore()
    const { category } = await searchParams
    const allProducts = await prisma.product.findMany()

    const lowStock = allProducts
        .filter(p => p.currentStock <= p.reorderThreshold)
        .map(p => ({ ...p, status: getStockStatus(p.currentStock, p.reorderThreshold, p.avgDailySales) }))
        .sort((a, b) => {
            const order = { critical: 0, warning: 1, unknown: 2, ok: 3 }
            return order[a.status.urgency] - order[b.status.urgency]
        })

    const categories = Array.from(
        new Set(lowStock.map(p => p.category).filter(Boolean))
    ) as string[]

    const filtered = category
        ? lowStock.filter(p => p.category === category)
        : lowStock

    const criticalCount = lowStock.filter(p => p.status.urgency === 'critical').length
    const outOfStock = lowStock.filter(p => p.currentStock <= 0).length
    const reorderProducts = allProducts.filter(p => p.currentStock <= p.reorderThreshold)

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Reorder Dashboard</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {lowStock.length === 0
                            ? 'All products are well stocked'
                            : lowStock.length + ' item' + (lowStock.length !== 1 ? 's' : '') + ' need' + (lowStock.length === 1 ? 's' : '') + ' attention'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {lowStock.length > 0 && (
                        <CopyReorderButton products={reorderProducts} />
                    )}
                    <Link href="/products/new">
                        <Button variant="outline" size="sm">+ Add Product</Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Needs Reorder</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{lowStock.length}</p>
                </div>
                <div className={'bg-white rounded-xl border p-5 ' + (criticalCount > 0 ? 'border-red-200' : 'border-slate-200')}>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Critical</p>
                    <p className={'text-3xl font-bold mt-2 ' + (criticalCount > 0 ? 'text-red-600' : 'text-slate-900')}>
                        {criticalCount}
                    </p>
                </div>
                <div className={'bg-white rounded-xl border p-5 ' + (outOfStock > 0 ? 'border-red-200' : 'border-slate-200')}>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Out of Stock</p>
                    <p className={'text-3xl font-bold mt-2 ' + (outOfStock > 0 ? 'text-red-700' : 'text-slate-900')}>
                        {outOfStock}
                    </p>
                </div>
            </div>

            {categories.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-5">
                    <Link
                        href="/dashboard"
                        className={'px-3 py-1 rounded-full text-sm font-medium border transition-colors ' +
                            (!category
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400')}
                    >
                        All
                    </Link>
                    {categories.map(cat => (
                        <Link
                            key={cat}
                            href={'/dashboard?category=' + encodeURIComponent(cat)}
                            className={'px-3 py-1 rounded-full text-sm font-medium border transition-colors ' +
                                (category === cat
                                    ? 'bg-slate-900 text-white border-slate-900'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400')}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
            )}

            {lowStock.length === 0 ? (
                <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-xl bg-white">
                    <p className="text-5xl mb-4">🎉</p>
                    <p className="text-slate-800 font-semibold text-lg">All stocked up!</p>
                    <p className="text-slate-400 text-sm mt-2">No products are below their reorder threshold.</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl bg-white">
                    <p className="text-4xl mb-3">🔍</p>
                    <p className="text-slate-700 font-medium">No items in this category</p>
                    <Link href="/dashboard" className="text-sm text-slate-400 hover:text-slate-600 mt-2 inline-block">
                        Clear filter
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wide">Product</th>
                            <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wide">Stock</th>
                            <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wide">Threshold</th>
                            <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wide">Est. Days Left</th>
                            <th className="text-right px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wide">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {filtered.map((p) => (
                            <tr
                                key={p.id}
                                className={'hover:bg-slate-50/80 transition-colors ' +
                                    (p.status.isUrgent
                                        ? 'bg-red-50/60 border-l-4 border-l-red-500'
                                        : p.status.urgency === 'critical' ? 'bg-red-50/30' : '')}
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-slate-900">{p.name}</p>
                                        {p.status.isUrgent && (
                                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-600 text-white animate-pulse">
                          URGENT
                        </span>
                                        )}
                                    </div>
                                    {p.category && (
                                        <p className="text-xs text-slate-400 mt-0.5">{p.category}</p>
                                    )}
                                </td>
                                <td className="px-5 py-4">
                    <span className={'font-medium ' + (p.currentStock <= 0 ? 'text-red-600' : 'text-slate-700')}>
                      {p.currentStock} {p.unit}
                    </span>
                                </td>
                                <td className="px-5 py-4 text-slate-400">
                                    {p.reorderThreshold} {p.unit}
                                </td>
                                <td className="px-5 py-4">
                                    <StockBadge urgency={p.status.urgency} label={p.status.label} />
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <form action={quickRestock.bind(null, p.id)}>
                                            <button
                                                type="submit"
                                                className="text-xs px-2.5 py-1.5 rounded-md bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors font-medium"
                                            >
                                                Quick Restock
                                            </button>
                                        </form>
                                        <Link href={'/products/' + p.id + '/edit'}>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}