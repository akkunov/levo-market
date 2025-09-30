import { prisma } from "@/lib/prisma";


// GET — получить каталог по id вместе с id связей CatalogAttribute
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const catalog = await prisma.catalog.findUnique({
        where: { id: Number(id) },
        include: {
            attributes: {
                include: { attribute: true }, // получаем сам атрибут
            },
        },
    });

    if (!catalog) return new Response("Каталог не найден", { status: 404 });

    const result = {
        id: catalog.id,
        name: catalog.name,
        slug: catalog.slug,
        attributes: catalog.attributes.map(ca => ({
            catalogAttributeId: ca.id, // id записи связи
            ...ca.attribute,           // данные атрибута
        })),
    };

    return Response.json(result);
}


// PUT — редактировать каталог
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await req.json(); // { name?, slug?, attributeIds? }

    const catalog = await prisma.catalog.update({
        where: { id: Number(id) },
        data: { name: body.name, slug: body.slug },
    });

    if (body.attributeIds) {
        await prisma.catalogAttribute.deleteMany({ where: { catalogId: catalog.id } });
        for (const attrId of body.attributeIds) {
            await prisma.catalogAttribute.create({
                data: { catalogId: catalog.id, attributeId: attrId },
            });
        }
    }

    return Response.json(catalog);
}

// DELETE — удалить каталог
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    await prisma.catalogAttribute.deleteMany({ where: { catalogId: Number(id) } });
    await prisma.product.deleteMany({ where: { catalogId: Number(id) } });

    const catalog = await prisma.catalog.delete({ where: { id: Number(id) } });

    return Response.json(catalog);
}
