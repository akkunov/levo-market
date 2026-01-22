// lib/services/catalog.service.ts
import { prisma } from '@/lib/prisma'
import {cache} from "react";

export const  getCatalogs = cache(
    async () => {
        return prisma.catalog.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
            },
            orderBy: { name: 'asc' },
        })
    }
)



export async function createCatalog(data: { name: string; slug: string }) {
    return prisma.catalog.create({ data })
}
