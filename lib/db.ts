import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function makeClient() {
    const url = process.env.DATABASE_URL || 'file:./dev.db'

    // Local SQLite file — no adapter needed
    if (url.startsWith('file:')) {
        return new PrismaClient()
    }

    // Turso / libsql — needs adapter
    const { createClient } = require('@libsql/client')
    const { PrismaLibSql } = require('@prisma/adapter-libsql')

    const client = createClient({ url })
    const adapter = new PrismaLibSql(client)
    return new PrismaClient({ adapter } as any)
}

export const prisma = globalForPrisma.prisma ?? makeClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma