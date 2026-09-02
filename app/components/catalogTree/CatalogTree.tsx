"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCatalog } from "@/app/components/catalogTree/CatalogProvider";

export type Catalog = {
    id: number;
    name: string;
    slug: string;
    children?: Catalog[];
};

interface CatalogTreeProps {
    categories: Catalog[];
    selectedSlug?: string;
}

export default function CatalogTree({
                                        categories,
                                        selectedSlug,
                                    }: CatalogTreeProps) {
    return (
        <ul className="space-y-2">
            {/* Все товары */}
            <li>
                <Link
                    href="/catalogs"
                    className={`flex items-center gap-2 rounded px-2 py-1 ${
                        !selectedSlug
                            ? "bg-gray-200 font-medium"
                            : "hover:bg-gray-100"
                    }`}
                >
                    <input
                        type="radio"
                        name="catalog"
                        checked={!selectedSlug}
                        readOnly
                        className="h-4 w-4"
                    />

                    <span >Все товары</span>
                </Link>
            </li>

            {/* Категории */}
            {categories.map((category) => (
                <CatalogItem
                    key={category.id}
                    category={category}
                    selectedSlug={selectedSlug}
                    level={0}
                />
            ))}
        </ul>
    );
}



function CatalogItem({
                         category,
                         selectedSlug,
                         level,
                     }: {
    category: Catalog;
    selectedSlug?: string;
    level: number;
}) {
    const { openIds, toggleCategory } = useCatalog();

    const hasChildren = Boolean(category.children?.length);
    const open = openIds.includes(category.id);
    const selected = selectedSlug === category.slug;

    return (
        <li>
            <div
                className="flex items-center gap-2"
                style={{ paddingLeft: `${level * 20}px` }}
            >
                {/*{hasChildren ? (*/}
                {/*    <button*/}
                {/*        type="button"*/}
                {/*        onClick={() => toggleCategory(category.id)}*/}
                {/*        className="w-9 text-3xl text-gray-500 hover:text-black"*/}
                {/*        aria-label={open ? "Свернуть" : "Развернуть"}*/}
                {/*    >*/}
                {/*        {open ? "−" : "+"}*/}
                {/*    </button>*/}
                {/*) : (*/}
                {/*    <span className="w-9" />*/}
                {/*)}*/}
                {hasChildren ? (
                        <Link
                            role={'button'}
                            href={`/catalogs/${category.slug}`}
                            onClick={() =>  toggleCategory(category.id)}
                            className={`flex flex-1 items-center gap-2 rounded px-2 py-1 ${
                                selected
                                    ? "bg-gray-200 font-medium"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            <input
                                type="radio"
                                name="catalog"
                                checked={selected}
                                readOnly
                                className="h-4 w-4"
                            />

                            <span>{category.name}</span>
                        </Link>
                ): (
                    <Link
                        role={'button'}
                        href={`/catalogs/${category.slug}`}
                        className={`flex flex-1 items-center gap-2 rounded px-2 py-1 ${
                            selected
                                ? "bg-gray-200 font-medium"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        <input
                            type="radio"
                            name="catalog"
                            checked={selected}
                            readOnly
                            className="h-4 w-4"
                        />

                        <span>{category.name}</span>
                    </Link>
                )}

            </div>

            <AnimatePresence initial={false}>
                {open && hasChildren && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1 overflow-hidden"
                    >
                        {category.children!.map((child) => (
                            <CatalogItem
                                key={child.id}
                                category={child}
                                selectedSlug={selectedSlug}
                                level={level + 1}
                            />
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </li>
    );
}