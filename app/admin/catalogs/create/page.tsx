'use client'
import {CatalogForm, Items} from "@/app/components/catalogForm/CatalogForm";

export default function NewCatalogPage() {
    const handleCreateCatalog = async ({ name, slug, attributes }: { name: string; slug: string; attributes: Items[] }) => {
        // Создаем каталог
        const catalog = await fetch("/api/catalogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, slug }),
        }).then((res) => res.json());

        // Создаем связи с атрибутами одним запросом
        if (attributes.length > 0) {
            await fetch("/api/catalogAttributes/bulk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    catalogId: catalog.id,
                    attributeIds: attributes.map((a) => a.id),
                }),
            });
        }

        alert("Каталог создан ✅");
    };

    return <CatalogForm onSubmitAction={handleCreateCatalog} />;
}