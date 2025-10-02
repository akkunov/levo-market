"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Zod схема с условной проверкой
const attributeSchema = z
    .object({
        name: z.string().min(1, "Название обязательно"),
        type: z.enum(["TEXT", "NUMBER", "DROPDOWN"]),
        options: z.string().optional(),
        catalogId: z.number(),
    })
    .refine(
        (data) =>
            data.type !== "DROPDOWN" ||
            (data.options && data.options.trim().length > 0),
        {
            message: "Для DROPDOWN нужно указать хотя бы одну опцию",
            path: ["options"],
        }
    );

// Тип формы на основе Zod
type AttributeForm = z.infer<typeof attributeSchema>;

type Catalog = { id: number; name: string };

export default function NewAttributePage() {
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<AttributeForm>({
        resolver: zodResolver(attributeSchema),
    });

    const type = watch("type");

    useEffect(() => {
        // загружаем каталоги
        fetch("/api/catalogs").then(res => res.json()).then(setCatalogs);
    }, []);

    const onSubmit = async (data: AttributeForm) => {
        await fetch("/api/attributes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...data,
                options: data.type === "DROPDOWN" ? data.options?.split(",").map(o => o.trim()) : [],
            }),
        });

        alert("Атрибут создан ✅");
    };

    return (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Создать атрибут</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Название */}
                <div>
                    <Input {...register("name")} placeholder="Название атрибута" />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Тип */}
                <div>
                    <label className="block mb-1 text-sm font-medium">Тип</label>
                    <Select
                        onValueChange={(val:"TEXT" | "NUMBER" | "DROPDOWN") => setValue("type", val)}
                        value={watch("type") || "TEXT"}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="TEXT">Текст</SelectItem>
                            <SelectItem value="NUMBER">Число</SelectItem>
                            <SelectItem value="DROPDOWN">Выпадающий список</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
                </div>

                {/* Опции */}
                {type === "DROPDOWN" && (
                    <div>
                        <Input {...register("options")} placeholder="Опции через запятую" />
                        {errors.options && <p className="text-red-500 text-sm mt-1">{errors.options.message}</p>}
                    </div>
                )}

                {/* Выбор каталога */}
                <div>
                    <label className="block mb-1 text-sm font-medium">Каталог</label>
                    <Select
                        onValueChange={(val) => setValue("catalogId", Number(val))}
                        value={watch("catalogId") ? String(watch("catalogId")) : ""}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите каталог" />
                        </SelectTrigger>
                        <SelectContent>
                            {catalogs.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    {errors.catalogId && <p className="text-red-500 text-sm mt-1">{errors.catalogId.message}</p>}
                </div>

                <Button onClick={handleSubmit(onSubmit)}>Сохранить атрибут</Button>
            </CardContent>
        </Card>
    );
}
