import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json(); // { catalogId, attributeId }
    const link = await prisma.catalogAttribute.create({
        data: {
            catalogId: body.catalogId,
            attributeId: body.attributeId,
        },
    });
    return Response.json(link);
}

