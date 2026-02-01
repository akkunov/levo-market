// lib/services/catalog.service.ts
import { prisma } from '@/lib/prisma'
import {unstable_cache} from "next/cache";


export const  getCatalogs =() =>
    unstable_cache(
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
            revalidate: 300,
            tags: ['catalogs'],
        }

    )




export async function createCatalog(data: { name: string; slug: string }) {
    return prisma.catalog.create({ data })
}
