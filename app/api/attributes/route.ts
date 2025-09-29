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

    // Если сразу нужно привязать к каталогам
    if (body.catalogIds?.length) {
        for (const catalogId of body.catalogIds) {
            await prisma.catalogAttribute.create({
                data: {
                    catalogId,
                    attributeId: attribute.id,
                },
            });
        }
    }

    return Response.json(attribute);
}
