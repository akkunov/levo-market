"use client";

import {useEffect, useState} from "react";
import {Card, CardTitle, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {FiPlus} from "react-icons/fi";

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    catalogId: number;
    catalog: {
        id: number;
        name: string;
        slug: string;
    };
    attributes: {
        id: number;
        value: string;
        attribute: {
            id: number;
            name: string;
            type: string;
            options: string[];
        };
    }[];
};

export default function ProductsAdmin() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Удалить этот продукт?")) return;
        await fetch(`/api/products/${id}`, {method: "DELETE"});
        setProducts(products.filter((p) => p.id !== id));
    };

    if (loading) return <div>Загрузка...</div>;

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Все продукты</h1>
                    <p className="text-sm text-gray-600">Home &gt; All Products</p>
                </div>
                <Link href={`/admin/products/create`}>
                    <button
                        className="flex items-center gap-2 bg-[#232321] hover:bg-[#232321]/90 text-white px-4 py-2 rounded-lg transition"
                    >
                        <FiPlus className="text-lg"/>
                        Создать продукт
                    </button>
                </Link>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center lg:p-4">
                {products.map((product) => (
                    <Card key={product.id}
                          className={`min-w-48 w-[298px] h-[460px] border-[1px] border-gray-300 shadow-none hover:shadow hover:border-none`}>
                        <CardContent
                            className="p-4 flex flex-col items-center justify-between text-start gap-4 w-[298px] h-[460px]">
                            <div className={`relative w-full h-[280px] mt-6 place-content-start `}>
                                <Image src={product.image} alt={product.title}
                                       className="object-contain" fill/>
                            </div>
                            <div className={`w-full`}>
                                <span className={`text-[12px] text-gray-500`}>{product.catalog.name}</span>
                                <CardTitle className={`text-[15px] font-normal`}>{product.title}</CardTitle>
                            </div>
                            <div className={`w-full flex flex-col gap-3`}>
                                <div className={`flex flex-row justify-between items-center`}>
                                <span className={`text-2xl font-bold`}>{product.price}
                                    <span className={`text-base font-normal pl-2`}>сом</span>
                              </span>
                                    <span className={`text-[#232d51] text-[13px]`}>Eсть в наличии</span>
                                </div>
                                <Link href={`/admin/products/${product.id}`}>
                                    <Button className={`rounded-sm px-4 w-full`}>Редактировать</Button>
                                </Link>
                                <Button
                                    className={`rounded-sm px-4 w-full bg-[#d71a21] hover:bg-[#f42736]`}
                                    onClick={() => handleDelete(product.id)}>Удалить</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>

    );
}
