import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const categoryId = searchParams.get("categoryId");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const skip = (page - 1) * limit;

    const where = categoryId ? { catalogId: Number(categoryId) } : {};

    const [products, total] = await Promise.all([
        prisma.product.findMany({
            where,
            include: { catalog: true },
            skip,
            take: limit,
            orderBy: { id: "desc" },
        }),
        prisma.product.count({ where }),
    ]);

    return Response.json({
        items: products,
        page,
        total,
        limit,
        totalPages: Math.ceil(total / limit),
    });
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
