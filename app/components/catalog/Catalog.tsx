import {FC} from "react";

import Container from "../container/Container";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

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
        products: Array.from({length: 5}, (_, i) => ({
            id: `wm-${i + 1}`,
            name: `Стиральная машина Levo ${i + 1}`,
            price: 20000 + i * 1500,
            image: `https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/63ccc1a6-81b5-444f-b3e6-bb382241d39f-wash.jpg`,
            description: `Энергоэффективная стиральная машина модели ${i + 1} с загрузкой 7 кг.`,
        })),
    },
    {
        id: "refrigerators",
        name: "Холодильники",
        products: Array.from({length: 10}, (_, i) => ({
            id: `fridge-${i + 3}`,
            name: `Холодильник Levo ${i + 1}`,
            price: 35000 + i * 2000,
            image: `https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/bda02c06-4e5f-4d46-b0f7-8b2f4a4cb5c5-fridge.png`,
            description: `Современный холодильник с системой No Frost, модель ${i + 1}.`,
        })),
    },
    {
        id: "freezers",
        name: "Морозильные лари",
        products: Array.from({length: 10}, (_, i) => ({
            id: `freezer-${i + 2}`,
            name: `Морозильный ларь Levo ${i + 1}`,
            price: 25000 + i * 1800,
            image: `https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/c7fdf589-076b-4188-aa83-a91b7f47845e-condationare.webp`,
            description: `Просторный морозильный ларь объемом 300 л, модель ${i + 1}.`,
        })),
    },
    {
        id: "conditioners",
        name: "Кондиционеры",
        products: Array.from({length: 10}, (_, i) => ({
            id: `ac-${i + 1}`,
            name: `Кондиционер Levo ${i + 6}`,
            price: 28000 + i * 2000,
            image: `https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/c7fdf589-076b-4188-aa83-a91b7f47845e-condationare.webp`,
            description: `Настенный кондиционер с функцией обогрева, модель ${i + 1}.`,
        })),
    },
    {
        id: "ovens",
        name: "Духовой шкаф ",
        products: Array.from({length: 10}, (_, i) => ({
            id: `oven-${i + 1}`,
            name: `Духовой шкаф Levo ${i + 1}`,
            price: 22000 + i * 1200,
            image: `https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/119f7310-a97e-48ae-a226-8f64f47494fe-oven.png`,
            description: `Электрический духовой шкаф с грилем и конвекцией, модель ${i + 1}.`,
        })),
    },
    {
        id: "cooktops",
        name: "Варочные поверхности",
        products: Array.from({length: 2}, (_, i) => ({
            id: `cooktop-${i + 1}`,
            name: `Варочная поверхность Levo ${i + 1}`,
            price: 15000 + i * 1000,
            image: `https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/d91a44a5-81ef-4e87-a075-defad0fad003-dask.png`,
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
                    dangerouslySetInnerHTML={{__html: JSON.stringify(productsSchema)}}
                />
            </Head>

            <Container className="flex flex-col text-start w-full mt-10 mx-auto">
                <ExploreGrid/>
            </Container>
        </section>
    );
};



export default function ExploreGrid() {
    return (
        <div className="grid gap-2">
            {/* Первый ряд — большой слева */}
            <div className="grid md:grid-cols-4 md:grid-rows-2 gap-2 lg:px-24 px-2 grid-cols-2">
                    <div
                        className="col-span-2 row-span-2  aspect-square flex relative items-center bg-gray-800/70 p-2 box-border">

                        <Link href="/products" className={`flex z-20`}>
                            <span className={`text-white flex z-30 absolute bottom-6 text-base md:text-2xl `}>Стиральные машины</span>
                            <Image
                                src="https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/63ccc1a6-81b5-444f-b3e6-bb382241d39f-wash.jpg"
                                alt="Стиральные машины"
                                className="object-cover z-10 absolute"
                                fill
                                sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                            />
                        </Link>
                    </div>
                <div
                    className="spect-square flex relative items-center bg-gray-800/70 p-4 box-border min-h-48 md:h-auto">
                    <Link href={'/products'} className={`flex z-20`}>
                        <span className={`text-white flex z-30 absolute bottom-6 text-base`}> Холодильники
                            Levo</span>
                        <Image
                            src={'https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/bda02c06-4e5f-4d46-b0f7-8b2f4a4cb5c5-fridge.png'}
                            alt={'Холодильники Levo'} className="object-cover" fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"/>
                    </Link>

                </div>
                <div
                    className="spect-square flex relative items-center bg-gray-800/70 p-4 box-border min-h-48  md:h-auto">
                    <Link className={`flex z-20`} href={'/products'}>
                        <span className={`text-white flex z-30 absolute bottom-6 text-base`}>Кондиционеры
                            Levo </span>
                        <Image
                            src={'https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/c7fdf589-076b-4188-aa83-a91b7f47845e-condationare.webp'}
                            alt={'Кондиционеры Levo'} className="object-cover" fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"/>
                    </Link>

                </div>
                <div
                    className="spect-square flex relative items-center bg-gray-800/70 p-4 box-border min-h-48 md:h-auto">
                    <Link  className={`flex z-20`} href={'/products'}>
                        <span className={`text-white flex z-30 absolute bottom-6 text-base`}>Духовые
                            шкафы</span>
                        <Image src={'https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/119f7310-a97e-48ae-a226-8f64f47494fe-oven.png'} alt={'Духовые шкафы'} className="object-cover" fill
                               sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"/>
                    </Link>

                </div>
                <div
                    className="spect-square flex relative items-center bg-gray-800/70 p-4 box-border min-h-48 md:h-auto">
                    <Link className={`flex z-20`}  href={'/products'}>
                        <span className={`text-white flex z-30 absolute bottom-6 text-base`}>
                            Варочные поверхности
                        </span>
                        <Image src={'https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/d91a44a5-81ef-4e87-a075-defad0fad003-dask.png'} alt={'Варочные поверхности'} className="object-cover" fill
                               sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"/>
                    </Link>

                </div>
            </div>

        </div>
    );
}