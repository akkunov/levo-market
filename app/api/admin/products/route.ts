import { prisma } from "@/lib/prisma";

export async function GET() {
    const products = await prisma.product.findMany({
        include: { catalog: true },
        orderBy: { id: "desc" },
    });

    return Response.json(products);
}
