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



export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await req.json(); // { title, price, image, catalogId, attributes }

    // Обновляем основные поля продукта
    const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
            title: body.title,
            price: body.price,
            image: body.image,
            catalogId: body.catalogId,
        },
        include: { catalog: true, attributes: { include: { attribute: true } } },
    });

    if (body.attributes && body.attributes.length > 0) {
        // Удаляем старые значения атрибутов
        await prisma.productAttributeValue.deleteMany({
            where: { productId: Number(id) },
        });

        // Создаём новые значения атрибутов
        const valuesToCreate = body.attributes.map((attr: { attributeId: number; value: string }) => ({
            productId: Number(id),
            attributeId: attr.attributeId,
            value: attr.value,
        }));

        await prisma.productAttributeValue.createMany({
            data: valuesToCreate,
        });
    }

    return Response.json(updatedProduct);
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
