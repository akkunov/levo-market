"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {GoPlus} from "react-icons/go";

type Catalog = {
    id: number;
    name: string;
    slug: string;
};

export default function CatalogsPage() {
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);
    const router = useRouter();

    // Загружаем список каталогов
    useEffect(() => {
        async function fetchCatalogs() {
            const res = await fetch("/api/catalogs");
            if (res.ok) {
                const data = await res.json();
                setCatalogs(data);
            }
        }
        fetchCatalogs();
    }, []);

    // Удаление каталога
    async function handleDelete(id: number) {
        if (!confirm("Удалить этот каталог?")) return;

        const res = await fetch(`/api/catalogs/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setCatalogs((prev) => prev.filter((c) => c.id !== id));
        } else {
            alert("Ошибка при удалении каталога");
        }
    }

    return (
        <div className="lg:p-8 p-2">
            <div className={`w-full flex flex-row justify-between`}>
                <h1 className="text-2xl font-bold mb-6">Каталоги</h1>
                <Button variant={'default'}
                 onClick={() => router.push('catalogs/create')}>Создать каталог <GoPlus /></Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                {catalogs.map((catalog) => (
                    <Card key={catalog.id} className="shadow-md min-w-52">
                        <CardHeader>
                            <CardTitle>{catalog.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-between items-center">
                            <Link href={`/admin/catalogs/${catalog.id}`}>
                                <Button variant="outline">Открыть</Button>
                            </Link>

                            <div className="flex gap-2">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    onClick={() => router.push(`/admin/catalogs/${catalog.id}/`)}
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="default"
                                    onClick={() => handleDelete(catalog.id)}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
