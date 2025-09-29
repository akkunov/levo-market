"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

type Catalog = { id: number; name: string };
type Attribute = {
    id: number;
    name: string;
    type: "TEXT" | "NUMBER" | "DROPDOWN";
    options: string[];
};

export default function NewProductPage() {
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);
    const [catalogId, setCatalogId] = useState<number | null>(null);
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [values, setValues] = useState<Record<number, string>>({});

    // Загружаем все каталоги
    useEffect(() => {
        fetch("/api/catalogs")
            .then((res) => res.json())
            .then(setCatalogs);
    }, []);

    // Подгружаем атрибуты выбранного каталога
    useEffect(() => {
        if (catalogId) {
            fetch(`/api/attributes/byCatalog/${catalogId}`)
                .then((res) => res.json())
                .then(setAttributes);
        } else {
            setAttributes([]);
            setValues({});
        }
    }, [catalogId]);

    const handleSubmit = async () => {
        if (!catalogId) return alert("Выберите каталог");

        const productData = {
            title,
            price: parseFloat(price),
            catalogId,
            attributes: Object.entries(values).map(([attributeId, value]) => ({
                attributeId: Number(attributeId),
                value,
            })),
        };

        await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });

        alert("Продукт создан ✅");
        setTitle("");
        setPrice("");
        setCatalogId(null);
        setAttributes([]);
        setValues({});
    };

    return (
        <Card className="max-w-2xl mx-auto mt-10">
            <CardHeader>
                <CardTitle>Создать продукт</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Название */}
                <Input
                    placeholder="Название продукта"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Цена */}
                <Input
                    type="number"
                    placeholder="Цена"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                {/* Выбор каталога */}
                <div>
                    <label className="block mb-1 text-sm font-medium">Каталог</label>
                    <Select
                        onValueChange={(val) => setCatalogId(Number(val))}
                        value={catalogId ? String(catalogId) : ""}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите каталог" />
                        </SelectTrigger>
                        <SelectContent>
                            {catalogs.map((c) => (
                                <SelectItem key={c.id} value={String(c.id)}>
                                    {c.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Динамические атрибуты */}
                {attributes.map((attr) => (
                    <div key={attr.id}>
                        <label className="block mb-1 text-sm font-medium">{attr.name}</label>

                        {attr.type === "TEXT" && (
                            <Input
                                value={values[attr.id] || ""}
                                onChange={(e) =>
                                    setValues({ ...values, [attr.id]: e.target.value })
                                }
                            />
                        )}

                        {attr.type === "NUMBER" && (
                            <Input
                                type="number"
                                value={values[attr.id] || ""}
                                onChange={(e) =>
                                    setValues({ ...values, [attr.id]: e.target.value })
                                }
                            />
                        )}

                        {attr.type === "DROPDOWN" && (
                            <Select
                                onValueChange={(val) =>
                                    setValues({ ...values, [attr.id]: val })
                                }
                                value={values[attr.id] || ""}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите значение" />
                                </SelectTrigger>
                                <SelectContent>
                                    {attr.options.map((opt) => (
                                        <SelectItem key={opt} value={opt}>
                                            {opt}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                ))}

                <Button onClick={handleSubmit}>Сохранить продукт</Button>
            </CardContent>
        </Card>
    );
}
