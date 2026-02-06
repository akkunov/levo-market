import CatalogPage from "@/app/pages/CatalogPage";
import {Metadata} from "next";
import {getCatalogs} from "@/shared/catalog.service";


type PageProps = {
    params: {
        slug: string;
    };
};


export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const categories = await getCatalogs()();
    const category = categories.find(c => c.slug === params.slug);

    const title = category
        ? `${category.name} LEVO — купить бытовую технику в Бишкеке`
        : "Все товары LEVO — бытовая техника Кыргызстан";

    const description = `Купить ${
        category ? category.name : "бытовую технику LEVO"
    } с доставкой и гарантией. LEVO — официальный магазин бытовой техники в Кыргызстане.`;

    const canonicalUrl = `https://levo.kg/catalogs/${params.slug}`;

    const ogImage =
        "https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/banner.jpeg";

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: "website",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}

export default async  function CatalogSlugPage({params}: {
    params: Promise<{ slug: string }>;
}) {
    const {slug} = await params
    return <CatalogPage slug={slug} />
}
