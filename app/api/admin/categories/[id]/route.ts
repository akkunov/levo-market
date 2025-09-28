import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabaseServer'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const supabase = createSupabaseServerClient()
        const { data } = await supabase.auth.getUser()
        const user = data.user
        if (!user || user.id !== process.env.NEXT_PUBLIC_ADMIN_UID) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { name, slug } = body

        if (!name || !slug) {
            return NextResponse.json({ error: 'name и slug обязательны' }, { status: 400 })
        }

        const updated = await prisma.category.update({
            where: { id: params.id },
            data: { name, slug },
        })

        return NextResponse.json(updated)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Ошибка при обновлении категории' }, { status: 500 })
    }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const supabase = createSupabaseServerClient()
        const { data } = await supabase.auth.getUser()
        const user = data.user
        if (!user || user.id !== process.env.NEXT_PUBLIC_ADMIN_UID) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await prisma.category.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Ошибка при удалении категории' }, { status: 500 })
    }
}



