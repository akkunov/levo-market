'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiPlus } from 'react-icons/fi'
import {Product} from "@prisma/client";
import WashMachine from "@/app/components/cards/washMachine/WashMachine";
import Link from "next/link";


export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [filter, setFilter] = useState('')
    const router = useRouter()

    useEffect(() => {
        fetch('/api/admin/products')
            .then(r => r.json())
            .then( r => {
                console.log(r)
                setProducts(r)
            })


    }, [])


    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">All Products</h1>
                    <p className="text-sm text-gray-600">Home &gt; All Products</p>
                </div>
                <button
                    onClick={() => router.push('/admin/products/create')}
                    className="flex items-center gap-2 bg-[#232321] hover:bg-[#232321]/90 text-white px-4 py-2 rounded-lg transition"
                >
                    <FiPlus className="text-lg" />
                    ADD NEW PRODUCT
                </button>
            </div>

            {/* Filter */}
            <input
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Фильтр по названию"
                className="border p-2 rounded mb-6 w-full max-w-sm"
            />

            {/* Products' grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(p => (
                    <Link  key={p.id} href={`/admin/products/${p.id}/edit`}>
                        <WashMachine alt={p.name} name={p.name} image={p.photoUrl} id={p.id} category={p.type} price={p.price}  />
                    </Link>

                ))}
            </div>
        </div>
    )
}
