import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || "1"); // текущая страница
    const limit = Number(searchParams.get("limit") || "12"); // кол-во карточек на страницу

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
        prisma.attribute.findMany({
            skip,
            take: limit,
            orderBy: { id: "desc" }, // сортировка (по id или createdAt)
            select: {
                id: true,
                name: true,
                type: true,
                options: true,
            },
        }),
        prisma.attribute.count(),
    ]);

    return Response.json({
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    });
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

    // Привязка к каталогам
    const catalogIds: number[] = [];

    if (body.catalogId) catalogIds.push(Number(body.catalogId));
    if (body.catalogIds && Array.isArray(body.catalogIds)) {
        catalogIds.push(...body.catalogIds.map(Number));
    }

    for (const catalogId of catalogIds) {
        await prisma.catalogAttribute.create({
            data: {
                catalogId,
                attributeId: attribute.id,
            },
        });
    }

    return Response.json(attribute);
}