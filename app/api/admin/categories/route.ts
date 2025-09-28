import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabaseServer'

export async function GET() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
    })
    return NextResponse.json(categories)
}

export async function POST(req: Request) {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    const user = data.user
    if (!user || user.id !== process.env.NEXT_PUBLIC_ADMIN_UID) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const name = String(body.name || '').trim()
    if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 })

    const slug = name.toLowerCase().replace(/\s+/g, '-')
    const category = await prisma.category.create({ data: { name, slug } })
    return NextResponse.json(category)
}
