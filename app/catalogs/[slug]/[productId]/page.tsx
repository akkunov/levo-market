'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProductItems,ProductOCatalog } from "@/app/admin/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundBack } from "react-icons/io";
import Head from "next/head";
import Script from "next/script";

export default function Product() {
    const [loading, setLoading] = useState(false);
    const [productItem, setProductItem] = useState<ProductItems>();
    const [related, setRelated] = useState<ProductOCatalog>();
    const [loadingRelated, setLoadingRelated] = useState(false);
    const router = useRouter();
    const params = useParams<{ productId: string }>();
    const { productId } = params;

    useEffect(() => {
        setLoading(true);
        fetch(`/api/products/${productId}`)
            .then(res => res.json())
            .then((data: ProductItems) => {
                setProductItem(data);
                setLoading(false);

                if (data?.catalogId) {
                    setLoadingRelated(true);
                    fetch(`/api/products?catalogId=${data.catalogId}`)
                        .then(res => res.json())
                        .then((rel) => {
                            setRelated(rel.items[0]);
                            setLoadingRelated(false);
                            console.log(rel)
                        })
                        .catch(() => setLoadingRelated(false));
                }
            })
            .finally(() => setLoading(false));
    }, [productId]);

    if (!productItem) return <Skeleton className="h-64 w-full" />;

    return (
        <>
            <Head>
                <title>{productItem.title} — купить {productItem.catalog?.name} LEVO в Бишкеке</title>
                <meta name="description" content={`Купить ${productItem.title} (${productItem.catalog?.name}) LEVO с доставкой и гарантией в Кыргызстане.`} />
                <link rel="canonical" href={`https://levo.kg/catalogs/${productItem.catalog?.slug}/${productId}`} />
                <meta property="og:title" content={`${productItem.title} — LEVO`} />
                <meta property="og:description" content={`${productItem.catalog?.name} LEVO — купить с доставкой в Бишкеке.`} />
                <meta property="og:image" content={productItem.image || '/blackLogo.svg'} />
            </Head>

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

            <Button className="m-4 p-4" onClick={() => router.back()}>
                <IoIosArrowRoundBack /> Назад
            </Button>

            <div className="md:flex-row lg:gap-6 flex flex-col items-center md:items-start justify-between p-2">
                {/* Фото товара */}
                <div className="relative md:w-1/2 w-3/4 h-[400px] md:h-[500px] p-2">
                    {loading ? (
                        <Skeleton className="h-full w-full" />
                    ) : (
                        <Image
                            src={productItem.image || '/noPoster.jpg'}
                            alt={productItem.title}
                            fill
                            className="rounded-md object-contain"
                        />
                    )}
                </div>

                {/* Информация о товаре */}
                <div className="md:w-1/2 space-y-4 p-2 w-full">
                    <h1 className="text-2xl font-bold md:text-3xl">{productItem.title}</h1>
                    <p className="text-sm font-normal md:text-base">{productItem.catalog?.name}</p>

                    <h2 className="md:text-lg font-semibold mt-4 text-base">Характеристики:</h2>
                    <ul className="space-y-2 w-full">
                        {loading ? (
                            Array.from({ length: 7 }).map((_, i) => <Skeleton key={i} className="w-full h-6" />)
                        ) : (
                            productItem.attributes?.map(attr => (
                                <li key={attr.id} className="flex justify-between border-b py-1">
                                    <span className="font-medium text-sm">{attr.attribute.name}:</span>
                                    <span className="font-bold text-sm">{attr.value}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>

            {/* Похожие товары */}
            <div className="col-span-12 mt-10 p-2">
                <h2 className="text-2xl font-bold mb-4">Похожие товары</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {loadingRelated
                        ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="w-full h-40" />)
                        : related?.products?.map(item => (
                            <Link key={item.id} href={`/catalogs/${productItem.catalog?.slug}/${item.id}`}>
                                <div className="border rounded-md p-2 flex flex-col items-center">
                                    <div className="relative w-full h-40">
                                        <Image
                                            src={item.image || "/noPoster.jpg"}
                                            alt={item.title || 'product photo'}
                                            fill
                                            style={{ objectFit: "contain" }}
                                            className="rounded-md"
                                        />
                                    </div>
                                    <p className="mt-2 text-sm font-medium text-center">{item.title}</p>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </>
    );
}
