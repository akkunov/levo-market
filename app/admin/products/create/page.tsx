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
import {revalidatePath} from "next/cache";

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
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

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

    // Локальное превью изображения
    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const handleSubmit = async () => {
        // Проверка обязательных полей
        if (!title.trim()) return alert("Введите название продукта");
        if (!price.trim() || Number(price) <= 0) return alert("Введите корректную цену");
        if (!catalogId) return alert("Выберите каталог");
        if (!file) return alert("Выберите изображение");

        for (const attr of attributes) {
            if (!values[attr.id] || !values[attr.id].trim()) {
                return alert(`Заполните атрибут: ${attr.name}`);
            }
        }



        // Загрузка на R2
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        const imageUrl: string = data.url;

        const productData = {
            title,
            price: parseFloat(price),
            catalogId,
            image: imageUrl,
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

        revalidatePath("/catalogs");
        revalidatePath("/catalogs/all");
        alert("Продукт создан ✅");

        // Сброс формы
        setTitle("");
        setPrice("");
        setCatalogId(null);
        setAttributes([]);
        setValues({});
        setFile(null);
        setPreview(null);
    };

    return (
        <Card className="max-w-2xl mx-auto mt-10 space-y-4">
            <CardHeader>
                <CardTitle>Создать продукт</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Название */}
                <Input
                    placeholder="Название продукта"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                {/* Цена */}
                <Input
                    type="number"
                    placeholder="Цена"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
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
                                required
                            />
                        )}

                        {attr.type === "NUMBER" && (
                            <Input
                                type="number"
                                value={values[attr.id] || ""}
                                onChange={(e) =>
                                    setValues({ ...values, [attr.id]: e.target.value })
                                }
                                required
                            />
                        )}

                        {attr.type === "DROPDOWN" && (
                            <Select
                                onValueChange={(val) =>
                                    setValues({ ...values, [attr.id]: val })
                                }
                                value={values[attr.id] || ""}
                                required
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

                {/* Загрузка изображения */}
                <div className="space-y-2">
                    <label className="block mb-1 text-sm font-medium">Изображение</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        required
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            className="mt-2 h-40 w-40 object-cover rounded"
                        />
                    )}
                </div>

                <Button onClick={handleSubmit}>Сохранить продукт</Button>
            </CardContent>
        </Card>
    );
}
