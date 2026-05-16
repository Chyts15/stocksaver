-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "currentStock" REAL NOT NULL,
    "reorderThreshold" REAL NOT NULL,
    "avgDailySales" REAL,
    "unit" TEXT NOT NULL DEFAULT 'units',
    "category" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
