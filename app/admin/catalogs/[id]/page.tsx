"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {CatalogForm, Items} from "@/app/components/catalogForm/CatalogForm";


export default function CatalogEditor() {
    const router = useRouter();
    const params = useParams();
    const catalogId = Number(params.id);

    const [catalog, setCatalog] = useState<{
        name: string;
        slug: string;
        attributes: Items[];
    } | null>(null);

    useEffect(() => {
        fetch(`/api/catalogs/${catalogId}`)
            .then((res) => res.json())
            .then((data) => setCatalog(data));
    }, [catalogId]);

    const handleUpdateCatalog = async ({ name, slug, attributes }: { name: string; slug: string; attributes: Items[] }) => {
        if (!catalog) return;

        // Обновляем сам каталог
        const updatedCatalog = await fetch(`/api/catalogs/${catalogId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, slug }),
        }).then((res) => res.json());

        // Обновляем связи с атрибутами
        if (attributes.length > 0) {
            await fetch("/api/catalogAttributes/bulk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    catalogId,
                    attributeIds: attributes.map((a) => a.id),
                }),
            });
        }

        alert("Каталог обновлён ✅");
        router.push("/admin/catalogs");

        console.log(updatedCatalog)
    };
    if (!catalog) return <div>Загрузка...</div>;

    return (
        <CatalogForm
            catalogId={catalogId}
            initialName={catalog.name}
            initialSlug={catalog.slug}
            initialAttributes={catalog.attributes}
            onSubmitAction={handleUpdateCatalog}
        />
    );
}
