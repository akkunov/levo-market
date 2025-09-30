"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type Attribute = { id: number; name: string; type: string };

export default function NewCatalogPage() {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [allAttributes, setAllAttributes] = useState<Attribute[]>([]);
    const [selectedAttributes, setSelectedAttributes] = useState<number[]>([]);

    const [newAttrName, setNewAttrName] = useState("");
    const [newAttrType, setNewAttrType] = useState<"TEXT" | "NUMBER" | "DROPDOWN">("TEXT");
    const [newAttrOptions, setNewAttrOptions] = useState<string>("");

    // Загружаем все существующие атрибуты
    useEffect(() => {
        fetch("/api/attributes")
            .then(res => res.json())
            .then(setAllAttributes);
    }, []);

    // Создать новый атрибут и сразу прикрепить к каталогу
    const handleCreateAttribute = async () => {
        if (!newAttrName) return alert("Введите имя атрибута");

        const attr = await fetch("/api/attributes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: newAttrName,
                type: newAttrType,
                options: newAttrType === "DROPDOWN" ? newAttrOptions.split(",") : [],
                catalogIds: [], // пока не прикрепляем, прикрепим после создания каталога
            }),
        }).then(res => res.json());

        setAllAttributes([...allAttributes, attr]);
        setSelectedAttributes([...selectedAttributes, attr.id]);
        setNewAttrName("");
        setNewAttrOptions("");
    };

    // Создать каталог и прикрепить выбранные атрибуты
    const handleCreateCatalog = async () => {
        if (!name || !slug) return alert("Введите имя и slug каталога");

        const catalog = await fetch("/api/catalogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, slug }),
        }).then(res => res.json());

        // Привязка выбранных атрибутов к каталогу
        for (const attrId of selectedAttributes) {
            await fetch("/api/catalogAttributes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ catalogId: catalog.id, attributeId: attrId }),
            });
        }

        alert("Каталог создан ✅");
        setName(""); setSlug(""); setSelectedAttributes([]);
    };

    return (
        <Card className="max-w-2xl mx-auto mt-10">
            <CardHeader><CardTitle>Создать каталог</CardTitle></CardHeader>
            <CardContent className="space-y-4">

                {/* Имя и slug каталога */}
                <Input placeholder="Название каталога" value={name} onChange={e => setName(e.target.value)} />
                <Input placeholder="Slug каталога" value={slug} onChange={e => setSlug(e.target.value)} />

                {/* Выбор существующих атрибутов */}
                <div>
                    <label className="block mb-1 text-sm font-medium">Выбрать атрибуты для каталога</label>
                    <Select
                        onValueChange={val => {
                            const id = Number(val);
                            if (!selectedAttributes.includes(id)) {
                                setSelectedAttributes([...selectedAttributes, id]);
                            }
                        }}
                        value=""
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Выбрать атрибут" />
                        </SelectTrigger>
                        <SelectContent>
                            {allAttributes.map(attr => (
                                <SelectItem key={attr.id} value={String(attr.id)}>{attr.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {selectedAttributes.map(id => {
                            const attr = allAttributes.find(a => a.id === id);
                            if (!attr) return null;
                            return <div key={id} className="px-2 py-1 bg-gray-200 rounded">{attr.name}</div>;
                        })}
                    </div>
                </div>

                {/* Создание нового атрибута */}
                <div className="border-t border-gray-300 pt-4">
                    <h3 className="text-sm font-medium mb-2">Создать новый атрибут</h3>
                    <Input placeholder="Имя атрибута" value={newAttrName} onChange={e => setNewAttrName(e.target.value)} />
                    <Select onValueChange={(val:"TEXT" | "NUMBER" | "DROPDOWN") => setNewAttrType(val)} value={newAttrType}>
                        <SelectTrigger><SelectValue placeholder="Тип атрибута" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="TEXT">TEXT</SelectItem>
                            <SelectItem value="NUMBER">NUMBER</SelectItem>
                            <SelectItem value="DROPDOWN">DROPDOWN</SelectItem>
                        </SelectContent>
                    </Select>
                    {newAttrType === "DROPDOWN" && (
                        <Input placeholder="Опции через запятую" value={newAttrOptions} onChange={e => setNewAttrOptions(e.target.value)} />
                    )}
                    <Button onClick={handleCreateAttribute}>Создать атрибут и прикрепить</Button>
                </div>

                <Button onClick={handleCreateCatalog}>Создать каталог</Button>
            </CardContent>
        </Card>
    );
}
