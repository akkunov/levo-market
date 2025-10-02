import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json();

    const { catalogId, attributeIds } = body as {
        catalogId: number;
        attributeIds: number[];
    };

    if (!catalogId || !Array.isArray(attributeIds)) {
        return new Response("Некорректные данные", { status: 400 });
    }

    const links = await prisma.catalogAttribute.createMany({
        data: attributeIds.map((attrId) => ({
            catalogId,
            attributeId: attrId,
        })),
        skipDuplicates: true, // если вдруг связь уже есть
    });

    return Response.json({ created: links.count });
}
