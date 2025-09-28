"use client"

import { useEffect, useState } from "react"
import { Header } from "@/app/components/header/Header"
import Container from "@/app/components/container/Container"
import WashMachine from "@/app/components/cards/washMachine/WashMachine"
import { Filter } from "@/app/components/filter/Filter"
import type { Category, Product } from "@prisma/client"

export default function ProductsPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [products, setProducts] = useState<(Product & { category: Category | null })[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>("Все")

    useEffect(() => {
        fetch("/api/admin/categories")
            .then(r => r.json())
            .then(setCategories)
    }, [])

    useEffect(() => {
        const url = selectedCategory === "Все"
            ? "/api/admin/products"
            : `/api/admin/products?categoryId=${selectedCategory}`
        fetch(url)
            .then(r => r.json())
            .then(setProducts)
    }, [selectedCategory])

    return (
        <>
            <Header />
            <Container className="mx-auto mt-22">
                <div className="mt-10 flex flex-row gap-x-8">
                    {/* Фильтр */}
                    <div className="hidden md:block">
                        <h3 className="my-4 font-bold text-base">Фильтр моделей</h3>
                        <Filter
                            categories={categories}
                            selected={selectedCategory}
                            onChange={setSelectedCategory}
                        />
                    </div>

                    {/* Список продуктов */}
                    <div className="sm:items-center flex-col flex-1">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map(product => (
                                <div key={product.id} className="m-2">
                                    <WashMachine
                                        image={product.photoUrl || "/placeholder.png"}
                                        name={product.name}
                                        alt={`Купить ${product.name} LEVO в Бишкеке — ${product.type}`}
                                        price={product.price}
                                        id={product.id}
                                        category={product.category?.name || ""}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
