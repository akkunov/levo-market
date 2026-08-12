// lib/services/catalog.service.ts
import { prisma } from '@/lib/prisma'
import {unstable_cache} from "next/cache";


export const  getCatalogs =() =>
    unstable_cache(
        async () => {
            return prisma.catalog.findMany({
                where: {
                    parentId: null,
                },
                select: {
                    id: true,
                    name: true,
                    slug: true,

                    children: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            parentId: true,
                        },
                        orderBy: {
                            name: 'asc',
                        },
                    },
                },

                orderBy: {
                    name: 'asc',
                },
            })
        },
        ['catalogs'],
        {
            revalidate: 60,
            tags: ['catalogs'],
        }

    )
