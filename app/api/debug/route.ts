export async function GET() {
    return Response.json({
        hasDbUrl: !!process.env.DATABASE_URL,
        dbUrlStart: process.env.DATABASE_URL?.substring(0, 20) ?? 'MISSING',
    })
}