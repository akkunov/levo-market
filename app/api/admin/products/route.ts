import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabaseServer'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get("categoryId")

    const products = await prisma.product.findMany({
        where: categoryId ? { categoryId } : {},
        include: { category: true },
        orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(products)
}

export async function POST(req: Request) {
    try {
        const supabase = createSupabaseServerClient()
        const { data } = await supabase.auth.getUser()
        const user = data.user
        if (!user || user.id !== process.env.NEXT_PUBLIC_ADMIN_UID) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { name, price, type, photoUrl, characteristics, categoryId } = body

        if (!name || !price || !type) {
            return NextResponse.json({ error: 'name, price и type обязательны' }, { status: 400 })
        }

        const product = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
                type,
                photoUrl,
                characteristics,
                categoryId,
                createdBy: user.id,
            },
        })

        return NextResponse.json(product)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Ошибка при создании продукта' }, { status: 500 })
    }
}