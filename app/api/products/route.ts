import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";


// Типизация блока `where`
type ProductWhereInput = {
    catalogId?: number;
};

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const catalogId = searchParams.get("catalogId");

    const where: ProductWhereInput = {};
    if (catalogId) where.catalogId = Number(catalogId);

    const [items, totalCount] = await Promise.all([
        prisma.product.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            select: {
                id: true,
                title: true,
                image: true,
                price: true,
            },
            orderBy: { id: "desc" }
        }),

        prisma.product.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return Response.json({ items, totalPages });
}

type ProductAttributeInput = {
    attributeId: number;
    value: string;
};

type ProductInput = {
    title: string;
    price: number;
    image: string;
    catalogId: number;
    attributes?: ProductAttributeInput[];
};



export async function POST(req: Request) {
    const body:ProductInput = await req.json();
    const product = await prisma.product.create({
        data: {
            title: body.title,
            price: body.price,
            image: body.image,
            catalogId: body.catalogId,
            attributes: {
                create: body.attributes?.map((attr) => ({
                    attributeId: attr.attributeId,
                    value: attr.value,
                })),
            },
        },
        include: { catalog: true, attributes: { include: { attribute: true } } },
    });
    return Response.json(product);
}
