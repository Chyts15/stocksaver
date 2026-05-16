import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.product.deleteMany()

    await prisma.product.createMany({
        data: [
            {
                name: 'Arabica Coffee Beans',
                currentStock: 1.5,
                reorderThreshold: 5,
                avgDailySales: 0.8,
                unit: 'kg',
                category: 'Beverages',
                supplier: 'Highlands Coffee Supply',
                supplierPhone: '+60 12-345 6789',
            },
            {
                name: 'Oat Milk',
                currentStock: 4,
                reorderThreshold: 12,
                avgDailySales: 2.1,
                unit: 'bottles',
                category: 'Beverages',
                supplier: 'Highlands Coffee Supply',
                supplierPhone: '+60 12-345 6789',
            },
            {
                name: 'Paper Cups (8oz)',
                currentStock: 30,
                reorderThreshold: 100,
                avgDailySales: 25,
                unit: 'pcs',
                category: 'Supplies',
                supplier: 'PaperPack Sdn Bhd',
                supplierPhone: '+60 3-7890 1234',
            },
            {
                name: 'Cane Sugar',
                currentStock: 0,
                reorderThreshold: 3,
                avgDailySales: 0.3,
                unit: 'kg',
                category: 'Ingredients',
                supplier: 'Kedai Runcit Ah Seng',
                supplierPhone: '+60 16-222 3344',
            },
            {
                name: 'Matcha Powder',
                currentStock: 200,
                reorderThreshold: 50,
                avgDailySales: null,
                unit: 'g',
                category: 'Beverages',
                supplier: 'Highlands Coffee Supply',
                supplierPhone: '+60 12-345 6789',
            },
            {
                name: 'Disposable Lids',
                currentStock: 80,
                reorderThreshold: 200,
                avgDailySales: 40,
                unit: 'pcs',
                category: 'Supplies',
                supplier: 'PaperPack Sdn Bhd',
                supplierPhone: '+60 3-7890 1234',
            },
        ],
    })

    console.log('✅ Seeded 6 products with supplier info')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())