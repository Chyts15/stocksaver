'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from './db'
import { z } from 'zod'

const ProductSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    currentStock: z.coerce.number().min(0, 'Cannot be negative'),
    reorderThreshold: z.coerce.number().min(0, 'Cannot be negative'),
    avgDailySales: z.preprocess(
        (v) => (v === '' || v === null || v === undefined ? null : Number(v)),
        z.number().min(0).nullable()
    ),
    unit: z.string().default('units'),
    category: z.string().optional(),
    supplier: z.string().optional(),
    supplierPhone: z.string().optional(),
})

export async function createProduct(_: unknown, formData: FormData) {
    const validated = ProductSchema.safeParse(Object.fromEntries(formData))
    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors }
    }
    await prisma.product.create({ data: validated.data })
    revalidatePath('/dashboard')
    revalidatePath('/products')
    redirect('/products')
}

export async function updateProduct(_: unknown, formData: FormData) {
    const id = formData.get('id') as string
    const validated = ProductSchema.safeParse(Object.fromEntries(formData))
    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors }
    }
    await prisma.product.update({ where: { id }, data: validated.data })
    revalidatePath('/dashboard')
    revalidatePath('/products')
    redirect('/products')
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({ where: { id } })
    revalidatePath('/dashboard')
    revalidatePath('/products')
}

export async function quickRestock(id: string) {
    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) return
    await prisma.product.update({
        where: { id },
        data: { currentStock: product.reorderThreshold * 2 },
    })
    revalidatePath('/dashboard')
}