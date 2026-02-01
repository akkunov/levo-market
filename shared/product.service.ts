import {prisma} from "@/lib/prisma";
import {cache} from "react";

export function getProduct(id: number) {
   return cache(
       async () => {
           return prisma.product.findUnique({
               where: { id: Number(id) },
               include: {
                   catalog:true,
                   attributes: { include: { attribute: true } },
               },

           })
       }
   )
}