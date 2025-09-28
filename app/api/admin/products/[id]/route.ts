import {NextRequest, NextResponse} from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabaseServer'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
})

async function deleteFromR2(url: string) {
    try {
        const key = url.replace(`${process.env.PUB_ENDPOINT}/`, '')
        await s3.send(
            new DeleteObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME!,
                Key: key,
            })
        )
    } catch (err) {
        console.error('Ошибка при удалении из R2:', err)
    }
}

export async function GET(req: NextRequest,
                          context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    try {
        const supabase = createSupabaseServerClient()
        const { data } = await supabase.auth.getUser()
        const user = data.user
        if (!user || user.id !== process.env.NEXT_PUBLIC_ADMIN_UID) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const product = await prisma.product.findUnique({ where: { id: id } })
        if (!product) {
            return NextResponse.json({ error: 'Продукт не найден' }, { status: 404 })
        }
        return NextResponse.json(product)
    } catch {
        return NextResponse.json({ error: 'Ошибка при загрузке продукта' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest,
                          context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    try {
        const supabase = createSupabaseServerClient()
        const { data } = await supabase.auth.getUser()
        const user = data.user
        if (!user || user.id !== process.env.NEXT_PUBLIC_ADMIN_UID) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { name, price, type, photoUrl, characteristics, categoryId } = body

        const existing = await prisma.product.findUnique({ where: { id: id } })
        if (!existing) {
            return NextResponse.json({ error: 'Продукт не найден' }, { status: 404 })
        }

        // если фото изменилось → удаляем старое
        if (photoUrl && existing.photoUrl && existing.photoUrl !== photoUrl) {
            await deleteFromR2(existing.photoUrl)
        }

        const updated = await prisma.product.update({
            where: { id: id },
            data: {
                name,
                price: parseFloat(price),
                type,
                photoUrl,
                characteristics,
                categoryId,
            },
        })

        return NextResponse.json(updated)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Ошибка при обновлении продукта' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest,
                             context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    try {
        const supabase = createSupabaseServerClient()
        const { data } = await supabase.auth.getUser()
        const user = data.user
        if (!user || user.id !== process.env.NEXT_PUBLIC_ADMIN_UID) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const existing = await prisma.product.findUnique({ where: { id: id } })
        if (!existing) {
            return NextResponse.json({ error: 'Продукт не найден' }, { status: 404 })
        }

        // удаляем фото из R2, если есть
        if (existing.photoUrl) {
            await deleteFromR2(existing.photoUrl)
        }

        await prisma.product.delete({ where: { id: id } })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Ошибка при удалении продукта' }, { status: 500 })
    }
}