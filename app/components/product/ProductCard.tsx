"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type ProductCardProps = {
    id: number;
    title: string;
    price?: number;
    image?: string;
    attributes?: { attribute: { id: number; name: string }; value: string }[];
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
};

export function ProductCard({
                                id,
                                title,
                                price,
                                image,
                                attributes = [],
                                onEdit,
                                onDelete,
                            }: ProductCardProps) {
    return (
        <Card className="w-[280px] shadow-md">
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-cover rounded-t-lg"
                />
            )}
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {price !== undefined && (
                    <p className="font-semibold mb-2">{price} ₸</p>
                )}
                <ul className="text-sm text-muted-foreground space-y-1">
                    {attributes.map((a) => (
                        <li key={a.attribute.id}>
                            <span className="font-medium">{a.attribute.name}:</span> {a.value}
                        </li>
                    ))}
                </ul>
                <div className="flex gap-2 mt-4">
                    {onEdit && (
                        <Button variant="outline" size="sm" onClick={() => onEdit(id)}>
                            Редактировать
                        </Button>
                    )}
                    {onDelete && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDelete(id)}
                        >
                            Удалить
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
