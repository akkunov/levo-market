
import { useEffect, useState } from "react";
import {Catalog, CatalogAttribute} from "@/app/admin/types";
import {Items} from "@/app/components/catalogForm/CatalogForm";

type FiltersSidebarProps = {
    catalog: Catalog; // выбранный каталог с атрибутами
    onChange: (filters: Record<string, number[]>) => void; // возвращаем выбранные фильтры
};

export function FiltersSidebar({ catalog, onChange }: FiltersSidebarProps) {
    const [selectedFilters, setSelectedFilters] = useState<Record<string, number[]>>({});

    const toggleFilter = (attrId: number, itemId: number) => {
        setSelectedFilters((prev) => {
            const current = prev[attrId] || [];
            const exists = current.includes(itemId);

            const updated = exists
                ? current.filter((id) => id !== itemId)
                : [...current, itemId];

            return { ...prev, [attrId]: updated };
        });
    };

    useEffect(() => {
        onChange(selectedFilters);
    }, [selectedFilters]);

    return (
        <aside className="w-64 border-r p-4 space-y-6">
            <h3 className="font-semibold text-lg">{catalog.name}</h3>

            {catalog.attributes.map((attr: CatalogAttribute) => (
                <div key={attr.id}>
                    <h4 className="font-medium">{attr.name}</h4>
                    <div className="space-y-1">
                        {/* Здесь рендерим чекбоксы с Items, подгружаемые из API */}
                        {/* Для примера — просто мок */}
                        {mockItems[attr.id]?.map((item) => (
                            <label key={item.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters[attr.id]?.includes(item.id) || false}
                                    onChange={() => toggleFilter(attr.id, item.id)}
                                />
                                <span>{item.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </aside>
    );
}

// пока мок, но можно дергать реальный API
const mockItems: Record<number, Items[]> = {
    1: [
        { id: 10, name: "Красный", type: "color" },
        { id: 11, name: "Синий", type: "color" },
    ],
    2: [
        { id: 20, name: "S", type: "size" },
        { id: 21, name: "M", type: "size" },
        { id: 22, name: "L", type: "size" },
    ],
};
