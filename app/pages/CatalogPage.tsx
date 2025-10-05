"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Catalog, ProductItems } from "@/app/admin/types";

const fetchCategories = async (): Promise<Catalog[]> => {
    const res = await fetch("/api/catalogs");
    return res.json();
};

const fetchProducts = async ({
                                 pageParam = 1,
                               catalogId
                             }: {
    pageParam?: number;
    catalogId:number | null;
}): Promise<{ items: ProductItems[]; totalPages: number }> => {
    const params = new URLSearchParams();
    params.set("page", pageParam.toString());
    params.set("limit", "9");
    if (catalogId) params.set("catalogId", catalogId.toString());

    const res = await fetch(`/api/products?${params.toString()}`);
    return res.json();
};

export default function CatalogPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedSlug = searchParams.get("slug") || null;

    // Получаем категории один раз
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
        refetch, // вот так
    } = useInfiniteQuery({
        queryKey: ["products", selectedSlug],
        queryFn: ({ pageParam = 1 }) =>
            fetchProducts({ pageParam, catalogId: selectedCategoryId}),
        getNextPageParam: (lastPage, allPages) =>
            allPages.length < lastPage.totalPages ? allPages.length + 1 : undefined,
        initialPageParam: 1,
    });

    const products = data?.pages.flatMap((p) => p.items) || [];

    // Автоподгрузка при скролле
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

    const handleSelectCategory = (slug: string | null) => {
        router.push(`/catalogs${slug ? `?slug=${slug}` : ""}`);
        refetch(); // Подгрузить новые товары для выбранного каталог// а
        console.log(products)
    };

    return (
        <div className="container mx-auto py-10 grid grid-cols-12 gap-6">
            {/* Левый блок — фильтры */}
            <aside className="col-span-12 md:col-span-3 border-r pr-4 space-y-6">
                <h2 className="font-semibold text-lg mb-2">Категории</h2>
                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => handleSelectCategory(null)}
                            className={`w-full text-left px-2 py-1 rounded ${
                                !selectedSlug ? "bg-gray-200" : "hover:bg-gray-100"
                            }`}
                        >
                            Все
                        </button>
                    </li>
                    {categories.map((cat) => (
                        <li key={cat.id}>
                            <button
                                onClick={() => handleSelectCategory(cat.slug)}
                                className={`w-full text-left px-2 py-1 rounded ${
                                    selectedSlug === cat.slug ? "bg-gray-200" : "hover:bg-gray-100"
                                }`}
                            >
                                {cat.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Правый блок — товары */}
            <main className="col-span-12 md:col-span-9">
                <h1 className="text-2xl font-bold mb-4">
                    {selectedSlug
                        ? categories.find((c) => c.slug === selectedSlug)?.name
                        : "Все товары"}
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {products.length === 0 && data === undefined
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <div key={i}>
                                <Skeleton className="h-40 w-full rounded-md" />
                                <Skeleton className="h-4 w-3/4 mt-2" />
                            </div>
                        ))
                        : products.map((p) => (
                            <div key={p.id} className="border rounded-lg p-2 flex flex-col">
                                <img
                                    src={p.image || ""}
                                    alt={p.title}
                                    className="w-full h-40 object-contain rounded-md"
                                />
                                <span className="mt-2 text-[12px] text-white/70">{p.catalog.name}</span>
                                <h2 className="font-semibold">{p.title}</h2>
                            </div>
                        ))}
                </div>

                {isFetchingNextPage && <p className="mt-4 text-center">Загрузка...</p>}
            </main>
        </div>
    );
}
