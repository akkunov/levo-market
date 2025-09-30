"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import Image from "next/image";

type Catalog = { id: number; name: string };
type Attribute = {
    id: number;
    name: string;
    type: "TEXT" | "NUMBER" | "DROPDOWN";
    options: string[];
};

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    catalogId: number;
    catalog: Catalog;
    attributes: { attributeId: number; value: string; attribute: Attribute }[];
};

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();
    const productId = Number(params.id);

    const [product, setProduct] = useState<Product | null>(null);
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [catalogId, setCatalogId] = useState<number | null>(null);
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [values, setValues] = useState<Record<number, string>>({});
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/products/${productId}`)
            .then((res) => res.json())
            .then((data: Product) => {
                setProduct(data);
                setTitle(data.title);
                setPrice(data.price.toString());
                setCatalogId(data.catalogId);
                const vals: Record<number, string> = {};
                data.attributes.forEach((a) => {
                    vals[a.attributeId] = a.value;
                });
                setValues(vals);
            });

        fetch("/api/catalogs").then((res) => res.json()).then(setCatalogs);
    }, [productId]);

    // Подгрузка атрибутов выбранного каталога
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
            setPreview(product?.image || null);
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file, product]);

    const handleSubmit = async () => {
        if (!title.trim() || !price.trim() || !catalogId) {
            return alert("Заполните все поля!");
        }

        let imageUrl = product?.image || "";

        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            imageUrl = data.url;
        }

        const updatedProduct = {
            title,
            price: parseFloat(price),
            catalogId,
            image: imageUrl,
            attributes: Object.entries(values).map(([attributeId, value]) => ({
                attributeId: Number(attributeId),
                value,
            })),
        };
        await fetch(`/api/products/${productId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct),
        });

        alert("Продукт обновлён ✅");
        router.push("/admin/products");
    };

    if (!product) return <div>Загрузка...</div>;

    return (
        <div className={`w-full`}>
            <Card className="max-w-2xl w-full mx-auto mt-10 space-y-4">
                <CardHeader>
                    <CardTitle>Редактировать продукт</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input name={title} placeholder="Название продукта" value={title} onChange={e => setTitle(e.target.value)} />
                    <Input name={price} type="number" placeholder="Цена" value={price} onChange={e => setPrice(e.target.value)} />

                    <div>
                        <label className="block mb-1 text-sm font-medium">Каталог</label>
                        <Select onValueChange={val => setCatalogId(Number(val))} value={catalogId ? String(catalogId) : ""}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите каталог" />
                            </SelectTrigger>
                            <SelectContent>
                                {catalogs.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    {attributes.map(attr => (
                        <div key={attr.id}>
                            <label className="block mb-1 text-sm font-medium">{attr.name}</label>
                            {attr.type === "TEXT" && (
                                <Input value={values[attr.id] || ""} onChange={e => setValues({ ...values, [attr.id]: e.target.value })} />
                            )}
                            {attr.type === "NUMBER" && (
                                <Input type="number" value={values[attr.id] || ""} onChange={e => setValues({ ...values, [attr.id]: e.target.value })} />
                            )}
                            {attr.type === "DROPDOWN" && (
                                <Select onValueChange={val => setValues({ ...values, [attr.id]: val })} value={values[attr.id] || ""}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите значение" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {attr.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    ))}

                    <div className="space-y-2">
                        <label className="block mb-1 text-sm font-medium">Изображение</label>
                        <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
                        {preview && <Image src={preview} alt="preview" className="mt-2 h-40 w-40 object-cover rounded" width={300} height={300} />}
                    </div>

                    <Button onClick={handleSubmit}>Сохранить продукт</Button>
                </CardContent>
            </Card>
        </div>

    );
}
