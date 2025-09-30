import { prisma } from "@/lib/prisma";

export async function GET() {
    const attributes = await prisma.attribute.findMany();
    return Response.json(attributes);
}

export async function POST(req: Request) {
    const body = await req.json();
    const attribute = await prisma.attribute.create({
        data: {
            name: body.name,
            type: body.type,
            options: body.options ?? [],
        },
    });

    // Привязка к каталогам
    const catalogIds: number[] = [];

    if (body.catalogId) catalogIds.push(Number(body.catalogId));
    if (body.catalogIds && Array.isArray(body.catalogIds)) {
        catalogIds.push(...body.catalogIds.map(Number));
    }

    for (const catalogId of catalogIds) {
        await prisma.catalogAttribute.create({
            data: {
                catalogId,
                attributeId: attribute.id,
            },
        });
    }

    return Response.json(attribute);
}