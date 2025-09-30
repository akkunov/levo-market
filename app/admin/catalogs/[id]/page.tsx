"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {Attribute} from "@prisma/client";
import {Catalog} from "@/app/components/catalog/Catalog";

type CatalogAttribute = {
    id: number;
    name: string
    catalogAttributeId: number
    attribute: Attribute;
};

type Catalog = {
    id: number;
    name: string;
    slug: string;
    attributes: CatalogAttribute[]; // теперь это массив связок
};

export default function CatalogEditor() {
    const router = useRouter();
    const params = useParams();
    const catalogId = Number(params.id);
    const [catalog, setCatalog] = useState<Catalog | null>();
    const [allAttributes, setAllAttributes] = useState<Attribute[]>([]);

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Загружаем каталог + его атрибуты
        fetch(`/api/catalogs/${catalogId}`)
            .then((res) => res.json())
            .then((res) => {
                setCatalog(res)
                console.log(catalog)
                console.log(res);
            });

        // Загружаем все доступные атрибуты
        fetch(`/api/attributes`)
            .then((res) => res.json())
            .then(setAllAttributes);
    }, [catalogId]);

    // Отправка изменений на сервер
    const saveCatalog = async (updated: Partial<Catalog>) => {
        if (!catalog) return;
        const res = await fetch(`/api/catalogs/${catalog.id}`, {
            method: "PUT",
            body: JSON.stringify(updated),
        });
        const updatedCatalog = await res.json();
        setCatalog((prev) => ({ ...prev!, ...updatedCatalog }));
    };

    // Обработчик изменения input с debounce
    const handleChange = (field: "name" | "slug", value: string) => {
        if (!catalog) return;

        setCatalog({ ...catalog, [field]: value });

        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(() => {
            saveCatalog({ [field]: value });
        }, 2000);
    };

    const removeAttribute = async (catalogAttrId: number) => {
        if (!catalog) return;

        await fetch(`/api/catalogAttributes/${catalogAttrId}`, { method: "DELETE" })
        console.log(catalog)
        setCatalog({
            ...catalog,
            attributes: catalog.attributes.filter((a) => a.catalogAttributeId !== catalogAttrId),
        });
    };

// добавление атрибута (через POST возвращаем уже объект связи с id)
    const addAttribute = async (attrId: number) => {
        if (!catalog) return;

        const res = await fetch(`/api/catalogAttributes`, {
            method: "POST",
            body: JSON.stringify({ catalogId: catalog.id, attributeId: attrId }),
        });

        const newLink: CatalogAttribute = await res.json();
        console.log(newLink)

        setCatalog({
            ...catalog,
            attributes: [...catalog.attributes, newLink],
        });
        console.log(catalog);
    };
    if (!catalog) return <div>Загрузка...</div>;

    const availableForAdd = allAttributes.filter(
        (a) => !catalog.attributes.some((ca) => ca.id === a.id)
    );

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-col gap-2">
                    <Input
                        value={catalog.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Название каталога"
                    />
                    <Input
                        value={catalog.slug}
                        onChange={(e) => handleChange("slug", e.target.value)}
                        placeholder="Slug"
                    />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Атрибуты каталога</h3>
                        <div className="flex flex-wrap gap-2">
                            {catalog.attributes.map((link) =>

                                    <Badge key={link.id} className="flex items-center gap-2 px-3 py-1 text-sm">
                                        {link.name}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-4 w-4 p-0"
                                            onClick={() => removeAttribute(link.catalogAttributeId)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </Badge>
                            )}
                            {catalog.attributes.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    Нет привязанных атрибутов
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <h3 className="text-lg font-semibold">Добавить атрибут</h3>
                        <div className="flex flex-wrap gap-2">
                            {availableForAdd.map((attr) => (
                                <Button
                                    key={attr.id}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addAttribute(attr.id)}
                                    className="flex items-center gap-1"
                                >
                                    <Plus className="h-4 w-4" />
                                    {attr.name}
                                </Button>
                            ))}
                            {availableForAdd.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    Все атрибуты уже добавлены
                                </p>
                            )}
                        </div>
                    </div>

                    <Button
                        variant={"outline"}
                        className={`mt-8`}
                        onClick={() => router.push(`/admin/catalogs`)}
                    >
                        Назад
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
