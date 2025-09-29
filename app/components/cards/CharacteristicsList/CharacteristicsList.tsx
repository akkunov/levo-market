import React from "react";
import type { Prisma } from "@prisma/client";

type JsonValue = Prisma.JsonValue;
type JsonObject = { [key: string]: JsonValue };

type Props = {
    data: JsonValue | null | undefined; // 👈 именно JsonValue из Prisma
    className?: string;
};

function formatKey(key: string) {
    return key.trim().replace(/\s+/g, " ").replace(/(^|\s)\S/g, s => s.toUpperCase());
}

function renderValue(value: JsonValue): React.ReactNode {
    if (value === null) return "—";

    if (Array.isArray(value)) {
        return (
            <ul className="list-disc list-inside space-y-0">
                {value.map((v, i) => (
                    <li key={i}>{renderValue(v)}</li>
                ))}
            </ul>
        );
    }

    if (typeof value === "object") {
        return (
            <div className="pl-3 border-l border-gray-200">
                {Object.entries(value as JsonObject).map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                        <span className="text-sm text-gray-500">{formatKey(k)}:</span>
                        <span className="text-sm text-gray-800">{renderValue(v)}</span>
                    </div>
                ))}
            </div>
        );
    }

    return String(value);
}

export const GroupedSpecs: React.FC<Props> = ({ data, className }) => {
    // Проверяем, что это объект (JSON из Prisma может быть строкой, массивом и т.д.)
    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return <div className={`text-sm text-gray-500 ${className ?? ""}`}>Характеристики отсутствуют</div>;
    }

    const groups = Object.entries(data as Record<string, JsonObject>);

    return (
        <section className={className}>
            {groups.map(([groupName, obj]) => (
                <div key={groupName} className="mb-6">
                    {/* Заголовок группы */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{formatKey(groupName)}</h2>

                    {/* Список характеристик */}
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        {Object.entries(obj).map(([k, v]) => (
                            <div key={k} className="flex flex-col">
                                <dt className="text-sm text-gray-500">{formatKey(k)}</dt>
                                <dd className="text-base font-medium text-gray-800 mt-0.5">{renderValue(v)}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            ))}
        </section>
    );
};
