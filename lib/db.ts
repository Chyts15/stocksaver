import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function getClient() {
    if (globalForPrisma.prisma) return globalForPrisma.prisma

    const url = process.env.DATABASE_URL ?? ''

    if (!url || url.startsWith('file:')) {
        const client = new PrismaClient()
        globalForPrisma.prisma = client
        return client
    }

    // Dynamic require so it's not evaluated at build time
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createClient } = require('@libsql/client')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PrismaLibSql } = require('@prisma/adapter-libsql')
    const libsql = createClient({ url })
    const adapter = new PrismaLibSql(libsql)
    const client = new PrismaClient({ adapter } as any)
    globalForPrisma.prisma = client
    return client
}

export const prisma = getClient()