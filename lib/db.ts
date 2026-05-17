import { PrismaClient } from '@prisma/client'
import { createClient } from '@libsql/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

let prismaInstance: PrismaClient

const dbUrl = process.env.DATABASE_URL ?? ''

if (dbUrl.startsWith('file:') || dbUrl === '') {
    prismaInstance = new PrismaClient()
} else {
    const client = createClient({ url: dbUrl })
    const adapter = new PrismaLibSql(client)
    prismaInstance = new PrismaClient({ adapter } as any)
}

export const prisma = globalForPrisma.prisma ?? prismaInstance

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma