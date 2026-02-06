
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

import Script from "next/script";
import {getProduct} from "@/shared/product.service";
import BackButton from "@/app/components/backButton/BackButton";
import { getRelatedProducts} from "@/shared/products.service";
import {Metadata} from "next";

type PageProps = {
    params: {
        slug: string;
        productId: string;
    };
};

/**
 * SEO + OG + Twitter
 * КРИТИЧНО: абсолютный URL картинки товара
 */
export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const productId = Number(params.productId);
    const product = await getProduct(productId)();

    if (!product) {
        return {
            title: "Товар не найден — LEVO",
            description: "Товар не найден",
        };
    }

    const title = `${product.title} — купить ${product.catalog?.name} LEVO в Бишкеке`;
    const description = `Купить ${product.title} (${product.catalog?.name}) LEVO с доставкой и гарантией в Кыргызстане.`;

    const canonicalUrl = `https://levo.kg/catalogs/${product.catalog?.slug}/${product.id}`;

    const ogImage =
        product.image?.startsWith("http")
            ? product.image
            : "https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/banner.jpeg";

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
                    alt: product.title,
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

export default async function Product({params}: {
    params: Promise<{ productId: number }>;
}) {

    const { productId } = await params;

    const productItem = await getProduct(productId)()
    console.log(productItem)
    if (!productItem) return <Skeleton className="h-64 w-full" />;
    const catalogId = productItem.catalog.id
    const relatedProducts = await getRelatedProducts(catalogId, productItem.id)()
    return (
        <>
            {/* JSON-LD для Google */}
            <Script
                id="product-jsonld"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": productItem.title,
                        "image": [productItem.image || "https://levo.kg/blackLogo.svg"],
                        "description": productItem.catalog?.name || "Товар LEVO",
                        "sku": productItem.id,
                        "brand": {
                            "@type": "Brand",
                            "name": "LEVO"
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": `https://levo.kg/catalogs/${productItem.catalog?.slug}/${productItem.id}`,
                            "priceCurrency": "KGS",
                            "price": productItem.price || "0",
                            "availability": "https://schema.org/InStock",
                            "itemCondition": "https://schema.org/NewCondition",
                            "seller": {
                                "@type": "Organization",
                                "name": "LEVO.KG"
                            }
                        }
                    })
                }}
            />

            <BackButton />
            <div className="md:flex-row lg:gap-6 flex flex-col items-center md:items-start justify-between p-2">
                {/* Фото товара */}
                <div className="relative md:w-1/2 w-3/4 h-[400px] md:h-[500px] p-2">

                        <Image
                            src={productItem.image || '/noPoster.jpg'}
                            alt={productItem.title}
                            fill
                            className="rounded-md object-contain"
                        />
                </div>

                {/* Информация о товаре */}
                <div className="md:w-1/2 space-y-4 p-2 w-full">
                    <h1 className="text-2xl font-bold md:text-3xl">{productItem.title}</h1>
                    <p className="text-sm font-normal md:text-base">{productItem.catalog?.name}</p>

                    <h2 className="md:text-lg font-semibold mt-4 text-base">Характеристики:</h2>
                    <ul className="space-y-2 w-full">
                        {
                            productItem.attributes?.map(attr => (
                                <li key={attr.id} className="flex justify-between border-b py-1">
                                    <span className="font-medium text-sm">{attr.attribute.name}:</span>
                                    <span className="font-bold text-sm">{attr.value}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            {/* Похожие товары */}
            <div className="col-span-12 mt-10 p-2">
                <h2 className="text-2xl font-bold mb-4">Похожие товары</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {relatedProducts.map(item => (
                        <Link
                            key={item.id}
                            prefetch
                            href={`/catalogs/${productItem.catalog?.slug}/${item.id}`}
                        >
                            <div className="border rounded-md p-2 flex flex-col items-center">
                                <div className="relative w-full h-40">
                                    <Image
                                        src={item.image || '/noPoster.jpg'}
                                        alt={item.title}
                                        fill
                                        className="rounded-md object-contain"
                                    />
                                </div>
                                <p className="mt-2 text-sm font-medium text-center">
                                    {item.title}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
