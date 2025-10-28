'use client';

import { useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Catalog, ProductItems } from "@/app/admin/types";
import Link from "next/link";
import Head from "next/head";

const fetchCategories = async (): Promise<Catalog[]> => {
    const res = await fetch("/api/catalogs");
    return res.json();
};

const fetchProducts = async ({
                                 pageParam = 1,
                                 catalogId
                             }: {
    pageParam?: number;
    catalogId: number | null;
}): Promise<{ items: ProductItems[]; totalPages: number }> => {
    const params = new URLSearchParams();
    params.set("page", pageParam.toString());
    params.set("limit", "11");
    if (catalogId) params.set("catalogId", catalogId.toString());
    const res = await fetch(`/api/products?${params.toString()}`);
    return res.json();
};

export default function CatalogPage({ slug }: { slug?: string }) {
    const selectedSlug = slug;

    const { data: categories = [] } = useQuery<Catalog[]>({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const selectedCategory = categories.find((c) => c.slug === selectedSlug);
    const selectedCategoryId = selectedCategory?.id ?? null;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["products", selectedSlug],
        queryFn: ({ pageParam = 1 }) =>
            fetchProducts({ pageParam, catalogId: selectedCategoryId }),
        getNextPageParam: (lastPage, allPages) =>
            allPages.length < lastPage.totalPages ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!selectedCategoryId || !selectedSlug,
    });

    const products = data?.pages.flatMap((p) => p.items) || [];

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);


    return (
        <>
            <Head>
                <title>
                    {selectedCategory
                        ? `${selectedCategory.name} LEVO — купить бытовую технику в Бишкеке`
                        : "Все товары LEVO — бытовая техника Кыргызстан"}
                </title>
                <meta
                    name="description"
                    content={`Купить ${selectedCategory ? selectedCategory.name : "бытовую технику LEVO"} с доставкой и гарантией. LEVO — официальный магазин бытовой техники в Кыргызстане.`}
                />
                <link rel="canonical" href={`https://levo.kg/catalogs/${selectedSlug || ""}`} />
            </Head>

            {/* Breadcrumbs */}
            <nav aria-label="breadcrumb" className="my-4 text-sm text-gray-500 p-2">
                <ol className="flex space-x-2">
                    <li><Link href="/">Главная</Link> / </li>
                    {selectedCategory && <li>{selectedCategory.name}</li>}
                </ol>
            </nav>

            <div className="grid grid-cols-12 gap-6 p-2">
                {/* Фильтры */}
                <aside className="col-span-12 md:col-span-3 border-r pr-4 space-y-4">
                    <h2 className="font-semibold text-lg mb-2">Категории</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/catalogs"
                                className={`w-full block px-2 py-1 rounded ${!selectedSlug ? "bg-gray-200" : "hover:bg-gray-100"}`}
                            >
                                Все
                            </Link>
                        </li>
                        {categories.map((cat) => (
                            <li key={cat.id}>
                                <Link
                                    href={`/catalogs/${cat.slug}`}
                                    className={`w-full block px-2 py-1 rounded ${selectedSlug === cat.slug ? "bg-gray-200" : "hover:bg-gray-100"}`}
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Товары */}
                <main className="col-span-12 md:col-span-9 overflow-y-scroll">
                    <h1 className="text-2xl font-bold mb-4">
                        {selectedCategory ? selectedCategory.name : "Все товары"}
                    </h1>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {products.length === 0 && data === undefined
                            ? Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-40 w-full rounded-md" />
                            ))
                            : products.map((p) => (
                                <Link href={`/catalogs/${selectedSlug ? `${selectedSlug}/${p.id}` : `all/${p.id}`}`} key={p.id}>
                                    <div className="border rounded-lg p-2 flex flex-col">
                                        <img
                                            src={p.image || "/noPoster.jpg"}
                                            alt={p.title}
                                            className="w-full h-40 object-contain rounded-md"
                                        />
                                        <span className="mt-2 text-[12px] text-black">{p.catalog.name}</span>
                                        <h2 className="font-semibold">{p.title}</h2>
                                    </div>
                                </Link>
                            ))}
                    </div>

                    {isFetchingNextPage && <p className="mt-4 text-center">Загрузка...</p>}
                </main>
            </div>
        </>
    );
}
