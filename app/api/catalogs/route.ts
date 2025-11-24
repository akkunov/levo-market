import { prisma } from "@/lib/prisma";

export async function GET() {
    const categories = await prisma.catalog.findMany({
        select: {
            id: true,
            name: true,
            slug: true
        },
        orderBy: { name: "asc" }
    });

    return Response.json(categories);
}

export async function POST(req: Request) {
    const body = await req.json();
    const catalog = await prisma.catalog.create({
        data: { name: body.name, slug: body.slug },
    });
    return Response.json(catalog);
}
