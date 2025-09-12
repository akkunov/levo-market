import {FC} from "react";
import WashMachine from "@/app/components/cards/washMachine/WashMachine";

import Container from "../container/Container";
import {Filter} from "@/app/components/filter/Filter";
import Head from "next/head";

export type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
};

export type Category = {
    id: string;
    name: string;
    products: Product[];
};

export const mockCategories: Category[] = [
    {
        id: "washing-machines",
        name: "Стиральные машины",
        products: Array.from({ length: 5 }, (_, i) => ({
            id: `wm-${i + 1}`,
            name: `Стиральная машина Levo ${i + 1}`,
            price: 20000 + i * 1500,
            image: `/demo/washMachine.png`,
            description: `Энергоэффективная стиральная машина модели ${i + 1} с загрузкой 7 кг.`,
        })),
    },
    {
        id: "refrigerators",
        name: "Холодильники",
        products: Array.from({ length: 10 }, (_, i) => ({
            id: `fridge-${i + 3}`,
            name: `Холодильник Levo ${i + 1}`,
            price: 35000 + i * 2000,
            image: `/demo/fridge.png`,
            description: `Современный холодильник с системой No Frost, модель ${i + 1}.`,
        })),
    },
    {
        id: "freezers",
        name: "Морозильные лари",
        products: Array.from({ length: 10 }, (_, i) => ({
            id: `freezer-${i + 2}`,
            name: `Морозильный ларь Levo ${i + 1}`,
            price: 25000 + i * 1800,
            image: `/demo/freezer.jpg`,
            description: `Просторный морозильный ларь объемом 300 л, модель ${i + 1}.`,
        })),
    },
    {
        id: "conditioners",
        name: "Кондиционеры",
        products: Array.from({ length: 10 }, (_, i) => ({
            id: `ac-${i + 1}`,
            name: `Кондиционер Levo ${i + 6}`,
            price: 28000 + i * 2000,
            image: `/demo/conditioner.jpg`,
            description: `Настенный кондиционер с функцией обогрева, модель ${i + 1}.`,
        })),
    },
    {
        id: "ovens",
        name: "Духовые шкафы",
        products: Array.from({ length: 10 }, (_, i) => ({
            id: `oven-${i + 1}`,
            name: `Духовой шкаф Levo ${i + 1}`,
            price: 22000 + i * 1200,
            image: `/demo/oven.png`,
            description: `Электрический духовой шкаф с грилем и конвекцией, модель ${i + 1}.`,
        })),
    },
    {
        id: "cooktops",
        name: "Варочные поверхности",
        products: Array.from({ length: 2 }, (_, i) => ({
            id: `cooktop-${i + 1}`,
            name: `Варочная поверхность Levo ${i + 1}`,
            price: 15000 + i * 1000,
            image: `/demo/cooktop.png`,
            description: `Стеклокерамическая варочная поверхность на 4 конфорки, модель ${i + 1}.`,
        })),
    },
];


export const Catalog: FC = () => {
    // Генерация JSON-LD для всех товаров
    const productsSchema = mockCategories.flatMap(category =>
        category.products.map(product => ({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: product.image,
            description: product.description,
            brand: {
                "@type": "Brand",
                name: "LEVO"
            },
            offers: {
                "@type": "Offer",
                priceCurrency: "KGS",
                price: product.price || "0", // подставь реальную цену
                availability: "https://schema.org/InStock"
            }
        }))
    );

    return (
        <section id="hero-catalog" className="flex flex-row columns-3 gap-x-4">
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
                />
            </Head>

            <Container className="flex flex-col text-start w-full">
                <h1 className="text-4xl text-black font-[var(--font-porsche-next)]">
                    Купить бытовую технику LEVO в Бишкеке — каталог моделей
                </h1>
                <div className="mt-10 flex flex-row gap-x-8">
                    <div className={`hidden md:block`}>
                        <h3 className="my-4 font-bold text-base">Фильтр моделей</h3>
                        <Filter />
                    </div>
                    <div className="sm:items-center flex-col flex-1">
                        {mockCategories.map((category) => (
                            <div key={category.name} className="w-full flex flex-col">
                                <h2 className="my-4 font-bold text-2xl mx-2">
                                    {category.name} LEVO — цены и характеристики
                                </h2>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {category.products.map((product) => (
                                        <div key={product.id} className="m-2">
                                            <WashMachine
                                                image={product.image}
                                                name={product.name}
                                                description={product.description}
                                                alt={`Купить ${product.name} LEVO в Бишкеке — ${product.description}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};