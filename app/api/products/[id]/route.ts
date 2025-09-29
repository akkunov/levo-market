import { prisma } from "@/lib/prisma";

// GET — продукт по ID
export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: { attributes: { include: { attribute: true } } },
    });
    if (!product) return new Response("Продукт не найден", { status: 404 });

    return Response.json(product);
}

// PUT — редактирование продукта
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await req.json(); // { title?, price?, attributeValues? }

    const product = await prisma.product.update({
        where: { id: Number(id) },
        data: {
            title: body.title,
            price: body.price,
            image: body.image,
        },
    });

    if (body.attributeValues) {
        // удаляем старые значения
        await prisma.productAttributeValue.deleteMany({ where: { productId: Number(id) } });

        // создаем новые значения
        for (const val of body.attributeValues) {
            await prisma.productAttributeValue.create({
                data: {
                    productId: Number(id),
                    attributeId: val.attributeId,
                    value: val.value,
                },
            });
        }
    }

    return Response.json(product);
}

// DELETE — удалить продукт
export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    // удаляем связанные значения атрибутов
    await prisma.productAttributeValue.deleteMany({ where: { productId: Number(id) } });

    const product = await prisma.product.delete({ where: { id: Number(id) } });

    return Response.json(product);
}
