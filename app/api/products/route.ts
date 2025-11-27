import {NextRequest} from "next/server";
import {prisma} from "@/lib/prisma";


type ProductWhereInput = {
    id?: number;
};

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);

    const catalogId = searchParams.get("catalogId");

    const where: ProductWhereInput = {};
    if (catalogId) where.id = Number(catalogId);

    const items = await prisma.catalog.findMany({
            where,
            include: {
                products : {
                    select: {
                        id: true,
                        title: true,
                        image: true,
                        price: true,
                    },
                    orderBy: {id: "desc"}
                }},

        })

        return Response.json({items});
}

type ProductAttributeInput = {
    attributeId: number;
    value: string;
};

type ProductInput = {
    title: string;
    price: number;
    image: string;
    catalogId: number;
    attributes?: ProductAttributeInput[];
};


export async function POST(req: Request) {
    const body: ProductInput = await req.json();
    const product = await prisma.product.create({
        data: {
            title: body.title,
            price: body.price,
            image: body.image,
            catalogId: body.catalogId,
            attributes: {
                create: body.attributes?.map((attr) => ({
                    attributeId: attr.attributeId,
                    value: attr.value,
                })),
            },
        },
        include: {catalog: true, attributes: {include: {attribute: true}}},
    });
    return Response.json(product);
}
