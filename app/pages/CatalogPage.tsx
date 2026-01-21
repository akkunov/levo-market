

import Link from "next/link";
import Head from "next/head";
import {getCatalogs} from "@/shared/catalog.service";




export default async function CatalogPage({ slug }: { slug?: string }) {
    console.log(slug)
    const categories =  await getCatalogs();
    const selectedSlug = slug;


    const selectedCategory = categories.find((c) => c.slug === selectedSlug);
    const selectedCategoryId = selectedCategory?.id ?? null;

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

                {/*/!* Товары *!/*/}
                {/*<main className="col-span-12 md:col-span-9">*/}
                {/*    <h1 className="text-2xl font-bold mb-4">*/}
                {/*        {selectedCategory ? selectedCategory.name : "Все товары"}*/}
                {/*    </h1>*/}

                {/*    <div className="flex flex-col gap-4">*/}
                {/*        { products.map((item) => (*/}
                {/*                <div className={`flex flex-col w-full`} key={item.id}>*/}
                {/*                    <h2 className={`text-2xl m-2 font-medium`}>{item.name}</h2>*/}
                {/*                    <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 pl-4`}>*/}
                {/*                        {*/}
                {/*                            item.products?.map((p) => (*/}
                {/*                                <Link href={`/catalogs/${selectedSlug ? `${selectedSlug}/${p.id}` : `all/${p.id}`}`} key={p.id}>*/}
                {/*                                    <div className="border rounded-lg p-2 flex flex-col">*/}
                {/*                                        <img*/}
                {/*                                            src={p.image || "/noPoster.jpg"}*/}
                {/*                                            alt={p.title}*/}
                {/*                                            className="w-full h-40 object-contain rounded-md"*/}
                {/*                                        />*/}
                {/*                                        <h2 className="font-semibold">{p.title}</h2>*/}
                {/*                                    </div>*/}
                {/*                                </Link>*/}
                {/*                            ))*/}
                {/*                        }*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*            ))*/}

                {/*        }*/}
                {/*    </div>*/}

                {/*    {isFetchingNextPage && <p className="mt-4 text-center">Загрузка...</p>}*/}
                {/*</main>*/}
            </div>
        </>
    );
}
