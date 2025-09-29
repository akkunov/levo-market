import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ catalogId: string }> }
) {
    const {catalogId} = await params;
    const attributes = await prisma.attribute.findMany({
        where: {
            catalogs: {
                some: { catalogId: Number(catalogId) },
            },
        },
    });
    return Response.json(attributes);
}
