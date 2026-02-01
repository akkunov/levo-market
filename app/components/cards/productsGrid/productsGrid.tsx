import Link from "next/link";
import {Catalog} from "@/app/admin/types";
import React from "react";
import {getProducts} from "@/shared/products.service";

interface Iprops {
    selectedCategory?: Omit<Catalog, "attributes"> | null;
}


const ProductsGrid =  async ({ selectedCategory } : Iprops) => {
    const products = await getProducts(selectedCategory?.id || null )();
    console.log(products)
    return (
        <main className="col-span-12 md:col-span-9">
            <h1 className="text-2xl font-bold mb-4">
                {selectedCategory ? selectedCategory.name : "Все товары"}
            </h1>

            <div className="flex flex-col gap-4">
                {products.map((item) => (
                    <div className={`flex flex-col w-full`} key={item.id}>
                        <h2 className={`text-2xl m-2 font-medium`}>{item.name}</h2>
                        <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 pl-4`}>
                            {
                                item.products?.map((p) => (
                                    <Link href={`/catalogs/${selectedCategory?.slug ? `${selectedCategory.slug}/${p.id}` : `all/${p.id}`}`}
                                          key={p.id}
                                          prefetch>
                                        <div className="border rounded-lg p-2 flex flex-col">
                                            <img
                                                src={p.image || "/noPoster.jpg"}
                                                alt={p.title}
                                                className="w-full h-40 object-contain rounded-md"
                                            />
                                            <h2 className="font-semibold">{p.title}</h2>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>

                ))

                }
            </div>
        </main>
    )
}

export default ProductsGrid
