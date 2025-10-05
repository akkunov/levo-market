'use client'

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import type {Product, ProductItems} from "@/app/admin/types";
import Image from "next/image";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Product(){
    const [loading, setLoading] = useState(false);
    const [productItem, setProductItem] = useState<ProductItems>();
    const [related, setRelated] = useState<Product>();
    const [loadingRelated, setLoadingRelated] = useState(false);
    const router = useRouter();

    const params = useParams<{productId: string;}>()
    const { productId} = params

    useEffect(() => {
        setLoading(true);
        fetch(`/api/products/${productId}`)
            .then(res => res.json())
            .then((data: ProductItems) => {
                setProductItem(data);
                setLoading(false);

                // после загрузки основного товара — грузим похожие
                if (data?.catalogId) {
                    setLoadingRelated(true);
                    fetch(`/api/products?catalogId=${data.catalogId}`)
                        .then(res => res.json())
                        .then((rel: Product) => {
                            setRelated(rel);
                            setLoadingRelated(false);
                        })
                        .catch(() => setLoadingRelated(false));
                }
            })
            .finally(() => setLoading(false));
    },[productId])


    return (
        <>
            <Button className="absolute top-4 left-4" variant="ghost"
                    onClick={() => router.back()}>
                Назад
            </Button>
            <div className="mx-auto py-10  md:flex-row lg:gap-6 flex flex-col items-center md:items-start justify-between">
                {/* Левая сторона — фото */}
                <div className="relative md:w-1/2 w-3/4 h-[400px] md:h-[500px] p-2 ">
                    {loading ? <Skeleton className="w-full h-full"/> : (
                        <Image
                            src={productItem?.image || '/noPoster.jpg'}
                            alt={productItem?.title || 'Постера нет'}
                            fill
                            style={{objectFit: "contain"}}
                            className="rounded-md"
                            loading={"lazy"}
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                        />
                    )}
                </div>

                {/* Правая сторона — название и характеристики */}
                <div className="md:w-1/2 space-y-4 p-2">
                    {loading ? (
                        <>
                            <Skeleton className="w-full h-8"/>
                            <Skeleton className="w-full h-8"/>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold md:text-3xl ">{productItem?.title}</h1>
                            <p className="text-sm font-normal md:text-base">{productItem?.catalog?.name}</p>
                        </>
                    )}

                    <h2 className="md:text-lg font-semibold mt-4 text-base">Характеристики:</h2>
                    <ul className="space-y-2 w-full">
                        {loading ? (
                            Array.from({length: 7}).map((_, index) => (
                                <Skeleton key={index} className="w-full h-6"/>
                            ))
                        ) : (
                            productItem?.attributes && productItem?.attributes.map((attr) => (
                                <li key={attr.id} className="flex justify-between border-b py-1">
                                    <span className="font-medium md:text-sm text-[10px]">{attr.attribute.name}:</span>
                                    <span className={`font-bold md:text-sm text-[10px]`}>{attr.value}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* Снизу — похожие товары */}

            </div>
            <div className="col-span-12 mt-10">
                <h2 className="text-2xl font-bold mb-4">Похожие товары</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
                    {loadingRelated ? (
                        Array.from({length: 4}).map((_, i) => (
                            <Skeleton key={i} className="w-full h-40"/>
                        ))
                    ) : (
                        related?.items.map((item) => (
                            <Link href={`${item.id}`} key={item.id}>
                                <div className="border rounded-md p-2 flex flex-col items-center">
                                    <div className="relative w-full h-40">
                                        <Image
                                            src={item.image || "/noPoster.jpg"}
                                            alt={item.title}
                                            fill
                                            style={{objectFit: "contain"}}
                                            className="rounded-md"
                                        />
                                    </div>
                                    <p className="mt-2 text-sm font-medium text-center">{item.title}</p>
                                </div>
                            </Link>

                        ))
                    )}
                </div>
            </div>
        </>

    )
}
