import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json();

    const link = await prisma.catalogAttribute.create({
        data: {
            catalogId: body.catalogId,
            attributeId: body.attributeId,
        },
        include: {
            attribute: true, // включаем объект атрибута
        },
    });

    // Формируем объект для фронта
    const result = {
        catalogAttributeId: link.id, // id связи
        ...link.attribute,           // id, name, type, options
    };

    return Response.json(result);
}
