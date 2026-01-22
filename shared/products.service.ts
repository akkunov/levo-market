import {unstable_cache} from "next/cache";
import {prisma} from "@/lib/prisma";



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

export function getRelatedProducts (catalogId: number, excludeProductId: number) {
    return unstable_cache(
        async () => {
            return prisma.product.findMany({
                where: {
                    catalogId,
                    NOT: {id: excludeProductId},
                },
                select: {
                    id: true,
                    title: true,
                    image: true,
                    price: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: 4,
            })
        },
        ['related-products',catalogId.toString(), excludeProductId.toString()],
        {
            revalidate: 600, // 10 минут
            tags: ['related-products'],
        }
    )
}
