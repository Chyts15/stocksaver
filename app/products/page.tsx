import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { deleteProduct } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { getStockStatus } from '@/lib/calculations'
import { StockBadge } from '@/components/StockBadge'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
    noStore()
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">All Products</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {products.length} item{products.length !== 1 ? 's' : ''} tracked
                    </p>
                </div>
                <Link href="/products/new">
                    <Button>+ Add Product</Button>
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-xl bg-white">
                    <p className="text-5xl mb-4">📦</p>
                    <p className="text-slate-800 font-semibold text-lg">No products yet</p>
                    <p className="text-slate-400 text-sm mt-2 mb-6">Add your first product to start tracking stock</p>
                    <Link href="/products/new"><Button>Add Product</Button></Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wide">Product</th>
                            <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wide">Stock</th>
                            <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wide">Threshold</th>
                            <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wide">Status</th>
                            <th className="text-left px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wide">Supplier</th>
                            <th className="text-right px-5 py-3.5 font-medium text-slate-500 text-xs uppercase tracking-wide">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {products.map((p) => {
                            const status = getStockStatus(p.currentStock, p.reorderThreshold, p.avgDailySales)
                            return (
                                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-5 py-4">
                                        <p className="font-semibold text-slate-900">{p.name}</p>
                                        {p.category && <p className="text-xs text-slate-400 mt-0.5">{p.category}</p>}
                                    </td>
                                    <td className="px-5 py-4 font-medium text-slate-700">
                                        {p.currentStock} {p.unit}
                                    </td>
                                    <td className="px-5 py-4 text-slate-400">
                                        {p.reorderThreshold} {p.unit}
                                    </td>
                                    <td className="px-5 py-4">
                                        <StockBadge urgency={status.urgency} label={status.label} />
                                    </td>
                                    <td className="px-5 py-4">
                                        {p.supplier ? (
                                            <div>
                                                <p className="text-slate-700 font-medium">{p.supplier}</p>
                                                {p.supplierPhone && (
                                                    <p className="text-xs text-blue-500 mt-0.5">{p.supplierPhone}</p>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-slate-300 text-xs">—</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 text-right space-x-2">
                                        <Link href={'/products/' + p.id + '/edit'}>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </Link>
                                        <form action={deleteProduct.bind(null, p.id)} className="inline">
                                            <button
                                                type="submit"
                                                className="text-xs px-3 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors font-medium"
                                            >
                                                Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}