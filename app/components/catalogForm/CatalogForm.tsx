"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { AttributeList } from "@/app/components/cards/attributeList/AttributeList";

export type Items = {
    catalogAttributeId?: number;
    id: number;
    name: string;
    type: string;
};

export type AttributeResponse = {
    items: Items[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

type CatalogFormProps = {
    catalogId?: number; // если есть — редактируем, иначе создаем
    initialName?: string;
    initialSlug?: string;
    initialAttributes?: Items[];
    onSubmitAction: (data: { name: string; slug: string; attributes: Items[] }) => Promise<void>;
};

type FormValues = {
    name: string;
    slug: string;
    options: string[];
    type:"TEXT" | "NUMBER" | "DROPDOWN";
};

export const CatalogForm = ({
                                catalogId,
                                initialName = "",
                                initialSlug = "",
                                initialAttributes = [],
                                onSubmitAction,
                            }: CatalogFormProps) => {
    const { register, handleSubmit, reset } = useForm<FormValues>({
        defaultValues: { name: initialName, slug: initialSlug },
    });

    const [attributes, setAttributes] = useState<Items[]>([]);
    const [selectedAttributes, setSelectedAttributes] = useState<Items[]>([...initialAttributes]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchAttributes = async (pageNum: number) => {
        if (loading || pageNum > totalPages) return;
        setLoading(true);

        const res = await fetch(`/api/attributes?page=${pageNum}&limit=15`);
        const data: AttributeResponse = await res.json();

        setAttributes((prev) => {
            const filtered = data.items.filter(
                (item) => !selectedAttributes.some((sa) => sa.id === item.id)
            );
            const merged = [...prev, ...filtered];
            return Array.from(new Map(merged.map((i) => [i.id, i])).values());
        });

        setPage(pageNum + 1);
        setTotalPages(data.totalPages);
        setLoading(false);
    };

    useEffect(() => {
        fetchAttributes(1);
    }, []);

    const handleSelectAttribute = (attr: Items) => {
        if (!selectedAttributes.find((a) => a.id === attr.id)) {
            setSelectedAttributes((prev) => [...prev, attr]);
            setAttributes((prev) => prev.filter((a) => a.id !== attr.id));
        }
    };

    const handleRemoveAttribute = (attrId: number ,
                                   catalogAttributeId?: number|undefined) => {
        const attr = selectedAttributes.find((a) => a.id === attrId);
        if (!attr) return;
        setSelectedAttributes((prev) => prev.filter((a) => a.id !== attrId));

        setAttributes((prev) => {
            // Добавляем обратно только если его там нет
            if (!prev.find((a) => a.id === attr.id)) {
                return [...prev, attr];
            }
            return prev;
        });
        if(!catalogAttributeId) return;
        fetch(`/api/catalogAttributes/${catalogAttributeId}`, { method: 'DELETE'});
    };

    const submitHandler: SubmitHandler<FormValues> = async (data) => {
        await onSubmitAction({ ...data, attributes: selectedAttributes });
        reset();
        setSelectedAttributes([]);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{catalogId ? "Редактировать каталог" : "Создать каталог"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                    <Input {...register("name", { required: true })} placeholder="Название каталога" />
                    <Input {...register("slug", { required: true })} placeholder="Slug" />

                    <h3 className="text-lg font-semibold">Выбранные атрибуты</h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedAttributes.map((attr) => (
                            <Badge
                                key={attr.id}
                                className="flex items-center gap-2 px-3 py-1 text-sm font-normal md:font-medium bg-white text-black border border-gray-200 hover:bg-gray-100"
                            >
                                {attr.name}
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-4 w-4 p-0"
                                    onClick={() => handleRemoveAttribute(attr.id, attr.catalogAttributeId)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        ))}
                    </div>

                    <h3 className="text-lg font-semibold">Все атрибуты</h3>
                    <AttributeList
                        attributes={attributes}
                        onSelectAction={handleSelectAttribute}
                        loading={loading}
                        hasMore={page <= totalPages}
                        loadMoreAction={() => fetchAttributes(page)}
                    />

                    <Button type="submit">{catalogId ? "Сохранить" : "Создать каталог"}</Button>
                </form>
            </CardContent>
        </Card>
    );
};
