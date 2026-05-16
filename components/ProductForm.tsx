'use client'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Product } from '@prisma/client'

type ActionFn = (_: unknown, formData: FormData) => Promise<{ error?: Record<string, string[]> } | void>

export function ProductForm({ action, product }: { action: ActionFn; product?: Product }) {
    const [state, formAction, pending] = useActionState(action, null)

    return (
        <form action={formAction} className="space-y-6">
            {product && <input type="hidden" name="id" value={product.id} />}

            {/* Section: Identity */}
            <div className="space-y-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Product Info</p>

                <div className="space-y-1.5">
                    <Label htmlFor="name">Product Name <span className="text-red-500">*</span></Label>
                    <Input
                        id="name"
                        name="name"
                        defaultValue={product?.name}
                        placeholder="e.g. Arabica Coffee Beans"
                        required
                        className="bg-slate-50 focus:bg-white transition-colors"
                    />
                    {state?.error?.name && (
                        <p className="text-xs text-red-600 flex items-center gap-1">⚠ {state.error.name[0]}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="unit">Unit</Label>
                        <Input
                            id="unit"
                            name="unit"
                            defaultValue={product?.unit ?? 'units'}
                            placeholder="units / kg / bottles"
                            className="bg-slate-50 focus:bg-white transition-colors"
                        />
                        <p className="text-xs text-slate-400">How you measure this item</p>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="category">Category <span className="text-slate-400 font-normal">(optional)</span></Label>
                        <Input
                            id="category"
                            name="category"
                            defaultValue={product?.category ?? ''}
                            placeholder="Beverages / Supplies..."
                            className="bg-slate-50 focus:bg-white transition-colors"
                        />
                        <p className="text-xs text-slate-400">Used for dashboard filtering</p>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Section: Stock levels */}
            <div className="space-y-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Stock Levels</p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="currentStock">Current Stock <span className="text-red-500">*</span></Label>
                        <Input
                            id="currentStock"
                            name="currentStock"
                            type="number"
                            step="0.01"
                            min="0"
                            defaultValue={product?.currentStock}
                            placeholder="0"
                            required
                            className="bg-slate-50 focus:bg-white transition-colors"
                        />
                        {state?.error?.currentStock && (
                            <p className="text-xs text-red-600">⚠ {state.error.currentStock[0]}</p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="reorderThreshold">Reorder Threshold <span className="text-red-500">*</span></Label>
                        <Input
                            id="reorderThreshold"
                            name="reorderThreshold"
                            type="number"
                            step="0.01"
                            min="0"
                            defaultValue={product?.reorderThreshold}
                            placeholder="10"
                            required
                            className="bg-slate-50 focus:bg-white transition-colors"
                        />
                        {state?.error?.reorderThreshold && (
                            <p className="text-xs text-red-600">⚠ {state.error.reorderThreshold[0]}</p>
                        )}
                        <p className="text-xs text-slate-400">Alert when stock drops below this</p>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="avgDailySales">
                        Avg Daily Sales{' '}
                        <span className="text-slate-400 font-normal">(optional)</span>
                    </Label>
                    <Input
                        id="avgDailySales"
                        name="avgDailySales"
                        type="number"
                        step="0.01"
                        min="0"
                        defaultValue={product?.avgDailySales ?? ''}
                        placeholder="Leave blank if unknown"
                        className="bg-slate-50 focus:bg-white transition-colors max-w-xs"
                    />
                    <p className="text-xs text-slate-400">
                        Used to calculate estimated days until out of stock
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />
            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Section: Supplier */}
            <div className="space-y-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Supplier</p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="supplier">
                            Supplier Name <span className="text-slate-400 font-normal">(optional)</span>
                        </Label>
                        <Input
                            id="supplier"
                            name="supplier"
                            defaultValue={product?.supplier ?? ''}
                            placeholder="e.g. Highlands Coffee Supply"
                            className="bg-slate-50 focus:bg-white transition-colors"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="supplierPhone">
                            Phone / Contact <span className="text-slate-400 font-normal">(optional)</span>
                        </Label>
                        <Input
                            id="supplierPhone"
                            name="supplierPhone"
                            defaultValue={product?.supplierPhone ?? ''}
                            placeholder="e.g. +60 12-345 6789"
                            className="bg-slate-50 focus:bg-white transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <Button type="submit" disabled={pending}>
                    {pending ? 'Saving...' : product ? 'Save Changes' : 'Add Product'}
                </Button>
                <a href="/products" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
                    Cancel
                </a>
            </div>
        </form>
    )
}