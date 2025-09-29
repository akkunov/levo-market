import { prisma } from "@/lib/prisma";

export async function GET() {
    const products = await prisma.product.findMany({
        include: { catalog: true, attributes: { include: { attribute: true } } },
    });
    return Response.json(products);
}

export async function POST(req: Request) {
    const body = await req.json();
    const product = await prisma.product.create({
        data: {
            title: body.title,
            price: body.price,
            image: body.image,
            catalogId: body.catalogId,
            attributes: {
                create: body.attributes?.map((attr: any) => ({
                    attributeId: attr.attributeId,
                    value: attr.value,
                })),
            },
        },
        include: { catalog: true, attributes: { include: { attribute: true } } },
    });
    return Response.json(product);
}
