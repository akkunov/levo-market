import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

type Catalog = {
    id: number;
    children?: Catalog[];
};

function getCatalogIds(catalog: Catalog): number[] {
    return [
        catalog.id,
        ...(catalog.children?.flatMap(getCatalogIds) ?? []),
    ];
}

export const getProducts = (
    catalog: Catalog | null
) =>
    unstable_cache(
        async () => {
            const catalogIds = catalog
                ? getCatalogIds(catalog)
                : null;

            return prisma.catalog.findMany({
                where: catalogIds
                    ? {
                        id: {
                            in: catalogIds,
                        },
                    }
                    : undefined,

                include: {
                    products: {
                        orderBy: {
                            title: "asc",
                        },
                        select: {
                            id: true,
                            title: true,
                            image: true,
                            price: true,
                        },
                    },
                },

                orderBy: {
                    name: "asc",
                },
            });
        },
        [
            "products",
            catalog
                ? String(catalog.id)
                : "all",
        ],
        {
            revalidate: 300,
            tags: ["products"],
        }
    );

export function getRelatedProducts(
    catalogId: number,
    excludeProductId: number
) {
    return unstable_cache(
        async () => {
            return prisma.product.findMany({
                where: {
                    catalogId,
                    NOT: {
                        id: excludeProductId,
                    },
                },
                select: {
                    id: true,
                    title: true,
                    image: true,
                    price: true,
                },
            });
        },
        [
            "related-products",
            catalogId.toString(),
            excludeProductId.toString(),
        ],
        {
            revalidate: 600,
            tags: ["related-products"],
        }
    );
}