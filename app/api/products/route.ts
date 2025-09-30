import { prisma } from "@/lib/prisma";

export async function GET() {
    const products = await prisma.product.findMany({
        include: { catalog: true, attributes: { include: { attribute: true } } },
    });
    return Response.json(products);
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
