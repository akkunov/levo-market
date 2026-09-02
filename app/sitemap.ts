import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [catalogs, products] = await Promise.all([
        prisma.catalog.findMany({
            select: {
                slug: true,
                updatedAt: true,
            },
            orderBy: {
                slug: "asc",
            },
        }),

        prisma.product.findMany({
            select: {
                id: true,
                updatedAt: true,
                catalog: {
                    select: {
                        slug: true,
                    },
                },
            },
            orderBy: {
                id: "asc",
            },
        }),
    ]);

    return [
        {
            url: "https://levo.kg/",
        },
        {
            url: "https://levo.kg/catalogs",
        },

        ...catalogs.map((catalog) => ({
            url: `https://levo.kg/catalogs/${catalog.slug}`,
            lastModified: catalog.updatedAt,
        })),

        ...products
            .filter((product) => product.catalog)
            .map((product) => ({
                url: `https://levo.kg/catalogs/${product.catalog!.slug}/${product.id}`,
                lastModified: product.updatedAt,
            })),
    ];
}