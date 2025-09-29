import { prisma } from "@/lib/prisma";

// DELETE — открепить атрибут от каталога
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const link = await prisma.catalogAttribute.delete({ where: { id: Number(id) } });
    return Response.json(link);
}
