import { createProduct } from '@/lib/actions'
import { ProductForm } from '@/components/ProductForm'
import Link from 'next/link'

export default function NewProductPage() {
    return (
        <div className="max-w-2xl">
            <div className="mb-6">
                <Link href="/products" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
                    ← Back to Products
                </Link>
                <h1 className="text-2xl font-bold text-slate-900 mt-2">Add Product</h1>
                <p className="text-slate-500 text-sm mt-1">Track a new item in your inventory</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <ProductForm action={createProduct} />
            </div>
        </div>
    )
}