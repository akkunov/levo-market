import {prisma} from "@/lib/prisma";
import {unstable_cache} from "next/cache";



export async function getProducts(catalogId: number | null) {
    const where = catalogId
        ? { id: catalogId }
        : {}

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
            },
        },
    })
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
            })
        },
        ['related-products',catalogId.toString(), excludeProductId.toString()],
        {
            revalidate: 600, // 10 минут
            tags: ['related-products'],
        }
    )
}
