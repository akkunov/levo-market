import {prisma} from "@/lib/prisma";
import {cache} from "react";
import {unstable_cache} from "next/cache";



type ProductWhereInput = {
    id?: number;
};

export function getProducts(catalogId: number | null) {
    return cache(
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
                    },
                },
            })
        },

    )
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
