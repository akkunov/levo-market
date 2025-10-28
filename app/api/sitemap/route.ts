import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

export async function GET() {
    try {
        const baseUrl = "https://levo.kg";

        // Получаем категории
        const catalogs = await prisma.catalog.findMany({
            select: { slug: true, updatedAt: true },
        });

        // Получаем товары
        const products = await prisma.product.findMany({
            select: { id: true, updatedAt: true, catalog: { select: { slug: true } } },
        });

        // Собираем ссылки с явным типом параметров
        const links = [
            { url: "/", changefreq: "weekly", priority: 1.0 },
            { url: "/catalogs", changefreq: "weekly", priority: 0.9 },
            ...catalogs.map((c: { slug: string; updatedAt: Date }) => ({
                url: `/catalogs/${c.slug}`,
                lastmodISO: c.updatedAt.toISOString(),
                changefreq: "weekly",
                priority: 0.8,
            })),
            ...products.map(
                (p: { id: number; updatedAt: Date; catalog: { slug: string } }) => ({
                    url: `/catalogs/${p.catalog.slug}/${p.id}`,
                    lastmodISO: p.updatedAt.toISOString(),
                    changefreq: "weekly",
                    priority: 0.7,
                })
            ),
        ];

        const stream = new SitemapStream({ hostname: baseUrl });
        const xmlString = await streamToPromise(Readable.from(links).pipe(stream)).then(
            (data) => data.toString()
        );

        return new NextResponse(xmlString, {
            headers: { "Content-Type": "application/xml" },
        });
    } catch (err) {
        console.error("Sitemap generation error:", err);
        return new NextResponse("Error generating sitemap", { status: 500 });
    }
}
