
import Link from "next/link";
import Head from "next/head";
import {getCatalogs} from "@/shared/catalog.service";

import {Suspense} from "react";
import ProductsGrid from "@/app/components/cards/productsGrid/productsGrid";

export default async function CatalogPage({ slug }: { slug?: string }) {
    const categories = await getCatalogs()()
    const selectedSlug = slug;
    const selectedCategory = categories.find((c) => c.slug === selectedSlug);
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
                    <li><Link href="/" prefetch>Главная</Link> / </li>
                    {selectedCategory && <li>{selectedCategory.name}</li>}
                </ol>
            </nav>

            <div className="grid grid-cols-12 gap-6 p-2 w-full">
                {/* Фильтры */}
                <aside className="col-span-12 md:col-span-3 border-r pr-4 space-y-4">
                    <h2 className="font-semibold text-lg mb-2">Категории</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                prefetch
                                href="/catalogs"
                                className={`w-full block px-2 py-1 rounded ${!selectedSlug ? "bg-gray-200" : "hover:bg-gray-100"}`}
                            >
                                Все
                            </Link>
                        </li>
                        {categories.map((cat) => (
                            <li key={cat.id}>
                                <Link
                                    prefetch
                                    href={`/catalogs/${cat.slug}`}
                                    className={`w-full block px-2 py-1 rounded ${selectedSlug === cat.slug ? "bg-gray-200" : "hover:bg-gray-100"}`}
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>
                <Suspense>
                    <ProductsGrid
                        selectedCategory={selectedCategory}/>
                </Suspense>
            </div>
        </>
    );
}
