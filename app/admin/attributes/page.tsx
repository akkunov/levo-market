"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


type Catalog = { id: number; name: string };


export default function NewAttributePage() {
    const [name, setName] = useState("");
    const [type, setType] = useState<"TEXT"|"NUMBER"|"DROPDOWN">("TEXT");
    const [options, setOptions] = useState("");
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);
    const [catalogId, setCatalogId] = useState<number | null>(null);

    useEffect(() => {
        fetch("/api/catalogs").then(res=>res.json()).then(setCatalogs);
    }, []);

    const handleSubmit = async () => {
        if (!catalogId) return alert("Выберите каталог");
        await fetch("/api/attributes", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                name,
                type,
                options: type === "DROPDOWN" ? options.split(",").map(o=>o.trim()) : [],
                catalogId
            })
        });
        alert("Атрибут создан ✅");
        setName(""); setOptions("");
    };

    return (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader><CardTitle>Создать атрибут</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Название атрибута" value={name} onChange={e=>setName(e.target.value)} />

                <div>
                    <label className="block mb-1 text-sm font-medium">Тип</label>
                    <Select onValueChange={val=>setType(val as any)} value={type}>
                        <SelectTrigger><SelectValue placeholder="Выберите тип" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="TEXT">Текст</SelectItem>
                            <SelectItem value="NUMBER">Число</SelectItem>
                            <SelectItem value="DROPDOWN">Выпадающий список</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {type === "DROPDOWN" && (
                    <Input placeholder="Опции через запятую" value={options} onChange={e=>setOptions(e.target.value)} />
                )}

                <div>
                    <label className="block mb-1 text-sm font-medium">Каталог</label>
                    <Select onValueChange={val=>setCatalogId(Number(val))} value={catalogId ? String(catalogId) : ""}>
                        <SelectTrigger><SelectValue placeholder="Выберите каталог" /></SelectTrigger>
                        <SelectContent>
                            {catalogs.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={handleSubmit}>Сохранить атрибут</Button>
            </CardContent>
        </Card>
        );
};
