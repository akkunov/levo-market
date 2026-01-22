// lib/services/catalog.service.ts
import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export const getCatalogs = unstable_cache(
    async () => {
        return prisma.catalog.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
            },
            orderBy: { name: 'asc' },
        })
    },
    ['catalogs'],
    {
        revalidate: 900,
        tags: ['catalogs'],
    }
)

type ProductWhereInput = {
    id?: number;
};


export function getProducts(catalogId: number | null) {
    return unstable_cache(
        async () => {
            const where: ProductWhereInput = {}
            if (catalogId) where.id = catalogId

            return prisma.catalog.findMany({
                where,
                include: {
                    products: {
                        select: {
                            id: true,
                            title: true,
                            image: true,
                            price: true,
                        },
                        orderBy: { createdAt: 'asc' },
                    },
                },
            })
        },
        ['products', catalogId?.toString() ?? 'all'],
        {
            revalidate: 300,
            tags: ['products'],
        }
    )()
}


export async function createCatalog(data: { name: string; slug: string }) {
    return prisma.catalog.create({ data })
}
