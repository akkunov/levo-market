"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // опционально, если у тебя есть helper для classNames

// Простой прямоугольник-плейсхолдер
export function Rect({ className = "" }: { className?: string }) {
    return <div className={cn("rounded-md bg-slate-200 animate-pulse", className)} />;
}

// Круглый аватар skeleton
export function AvatarSkeleton({ size = 10 }: { size?: number }) {
    return <div className={`rounded-full bg-slate-200 animate-pulse`} style={{ width: `${size}rem`, height: `${size}rem` }} />;
}

// Skeleton карточки (подходящая для товарной карточки)
export function ProductCardSkeleton() {
    return (
        <Card className="w-full animate-pulse">
            <CardHeader>
                <CardTitle>
                    <div className="h-5 w-3/4 bg-slate-200 rounded-md" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex gap-4">
                    <div className="w-28 h-28 bg-slate-200 rounded-md" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/2 bg-slate-200 rounded" />
                        <div className="h-4 w-1/3 bg-slate-200 rounded" />
                        <div className="h-3 w-2/3 bg-slate-200 rounded" />
                    </div>
                </div>

                <div className="flex gap-2">
                    <div className="h-8 w-20 bg-slate-200 rounded-md" />
                    <div className="h-8 w-20 bg-slate-200 rounded-md" />
                </div>
            </CardContent>
        </Card>
    );
}

// Skeleton списка карточек (grid)
export function GridSkeleton({ columns = 3, items = 6 }: { columns?: number; items?: number }) {
    return (
        <div className={`grid grid-cols-1 lg:grid-cols-${columns} gap-4`}>
            {Array.from({ length: items }).map((_, i) => (
                <div key={i} className="p-2">
                    <ProductCardSkeleton />
                </div>
            ))}
        </div>
    );
}

// Skeleton для панели с кнопками/тегов (например, и для атрибутов)
export function TagsSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="flex flex-wrap gap-2">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="h-8 w-24 bg-slate-200 rounded-md animate-pulse" />
            ))}
        </div>
    );
}

// Пример использования в странице/компоненте:
// const [loading, setLoading] = useState(true);
// return loading ? <GridSkeleton /> : <ActualGrid />
