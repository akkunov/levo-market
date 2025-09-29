import { prisma } from "@/lib/prisma";

export async function GET() {
    const catalogs = await prisma.catalog.findMany({
        include: { attributes: { include: { attribute: true } } },
    });
    return Response.json(catalogs);
}

export async function POST(req: Request) {
    const body = await req.json();
    const catalog = await prisma.catalog.create({
        data: { name: body.name, slug: body.slug },
    });
    return Response.json(catalog);
}
