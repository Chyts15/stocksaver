-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currentStock" DOUBLE PRECISION NOT NULL,
    "reorderThreshold" DOUBLE PRECISION NOT NULL,
    "avgDailySales" DOUBLE PRECISION,
    "unit" TEXT NOT NULL DEFAULT 'units',
    "category" TEXT,
    "supplier" TEXT,
    "supplierPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
