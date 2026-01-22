import {unstable_cache} from "next/cache";
import {prisma} from "@/lib/prisma";

export function getProduct(id: number) {
   return unstable_cache(
       async () => {
           return prisma.product.findUnique({
               where: { id: Number(id) },
               include: {
                   catalog:true,
                   attributes: { include: { attribute: true } },
               },

           })
       },
       ['product', id.toString()],
       {
           revalidate: 900,
           tags: ['product'],
       }
   )
}