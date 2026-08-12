import Link from "next/link";
import { Catalog } from "@/app/admin/types";
import React from "react";
import { getProducts } from "@/shared/products.service";

interface IProps {
    selectedCategory?: Omit<Catalog, "attributes"> | null;
}

const ProductsGrid = async ({ selectedCategory }: IProps) => {
    const products = await getProducts(selectedCategory || null)();

    return (
        <main className="col-span-12 md:col-span-9">
            <h1 className="mb-4 text-2xl font-bold">
                {selectedCategory ? '' : "Все товары"}
            </h1>

            <div className="flex flex-col gap-4">
                {products.map((item) => (
                    <div key={item.id} className="flex w-full flex-col">
                        <h2 className="mb-2 text-lg font-semibold">{item.name}</h2>
                        <div className="grid grid-cols-2 gap-4 pl-4 md:grid-cols-3">
                            {item.products?.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/catalogs/${selectedCategory?.slug ? `${selectedCategory.slug}/${product.id}` : `all/${product.id}`}`}
                                    prefetch
                                >
                                    <div className="flex flex-col rounded-lg border p-2">
                                        <img
                                            src={product.image || "/noPoster.jpg"}
                                            alt={product.title}
                                            className="h-40 w-full rounded-md object-contain"
                                        />

                                        <h2 className="font-semibold">
                                            {product.title}
                                        </h2>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default ProductsGrid;