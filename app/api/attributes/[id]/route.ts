import { prisma } from "@/lib/prisma";

// GET — один атрибут
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const attr = await prisma.attribute.findUnique({ where: { id: Number(id) } });
    if (!attr) return new Response("Атрибут не найден", { status: 404 });
    return Response.json(attr);
}

// PUT — редактировать атрибут
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await req.json(); // { name?, type?, options? }
    const attr = await prisma.attribute.update({
        where: { id: Number(id) },
        data: {
            name: body.name,
            type: body.type,
            options: body.options ?? [],
        },
    });
    return Response.json(attr);
}

// DELETE — удалить атрибут
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await prisma.catalogAttribute.deleteMany({ where: { attributeId: Number(id) } });
    await prisma.productAttributeValue.deleteMany({ where: { attributeId: Number(id) } });
    const attr = await prisma.attribute.delete({ where: { id: Number(id) } });
    return Response.json(attr);
}
