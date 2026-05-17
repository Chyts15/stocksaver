import { unstable_noStore as noStore } from 'next/cache'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { updateProduct } from '@/lib/actions'
import { ProductForm } from '@/components/ProductForm'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function EditProductPage({
                                                  params,
                                              }: {
    params: Promise<{ id: string }>
}) {
    noStore()
    const { id } = await params
    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) notFound()

    return (
        <div className="max-w-2xl">
            <div className="mb-6">
                <Link href="/products" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
                    ← Back to Products
                </Link>
                <h1 className="text-2xl font-bold text-slate-900 mt-2">Edit Product</h1>
                <p className="text-slate-500 text-sm mt-1">Update stock levels or product details</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <ProductForm action={updateProduct} product={product} />
            </div>
        </div>
    )
}