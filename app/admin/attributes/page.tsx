"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { useRouter } from "next/navigation";

type Attribute = {
    id: number;
    name: string;
    type: string;
    options: string[];
};

export default function AttributesList() {
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const observerRef = useRef<HTMLDivElement | null>(null);
    const observerInstance = useRef<IntersectionObserver | null>(null);

    const fetchAttributes = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        const res = await fetch(`/api/attributes?page=${page}&limit=9`);
        const data = await res.json();

        // фильтруем дубликаты по id
        setAttributes(prev => {
            const newItems = data.items.filter((item: Attribute) => !prev.some(a => a.id === item.id));
            return [...prev, ...newItems];
        });

        setPage(prev => prev + 1);
        setHasMore(page < data.totalPages);
        setLoading(false);
    };

    useEffect(() => {
        fetchAttributes();
    }, []);

    useEffect(() => {
        if (!observerRef.current) return;

        // уничтожаем предыдущий observer, если есть
        if (observerInstance.current) observerInstance.current.disconnect();

        observerInstance.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    fetchAttributes();
                }
            },
            { threshold: 1.0 }
        );

        observerInstance.current.observe(observerRef.current);

        return () => observerInstance.current?.disconnect();
    }, [hasMore, loading]);

    async function handleDelete (id:number) {
            fetch(`/api/attributes/${id}`,{
                method:'DELETE'
            })
                .then(_ => {
                    setAttributes(prev => {
                        const newItems = prev.filter((item: Attribute) => item.id != id);
                        return [...newItems];
                    });
                })
    }
    return (
        <>
            <div className="w-full flex flex-row justify-between">
                <h1 className="text-2xl font-bold mb-6">Атрибуты</h1>
                <Button variant="default" onClick={() => router.push('attributes/create')}>
                    <GoPlus /> Создать атрибут
                </Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {attributes.map(attr => (
                    <Card key={attr.id} className="shadow-md min-w-52">
                        <CardHeader>
                            <CardTitle>{attr.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Тип: {attr.type}</p>
                            {attr.options.length > 0 && (
                                <ul className="text-xs mt-2">
                                    {attr.options.map((opt, i) => (
                                        <li key={i}>• {opt}</li>
                                    ))}
                                </ul>
                            )}

                            <Button onClick={() => handleDelete(attr.id)}>Удалить</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div ref={observerRef} className="h-10" />

            {loading && <p className="text-center mt-4">Загрузка...</p>}
        </>
    );
}
