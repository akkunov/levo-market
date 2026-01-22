import {FC} from "react";

import Container from "../container/Container";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";



export type Category = {
    id: string;
    name: string
    slug: string
};

export const mockCategories: Category[] = [
    {
        id: "washing-machines",
        name: "Стиральные машины",
        slug: "stiralnay-mashina"
    },
    {
        id: "refrigerators",
        name: "Холодильники",
        slug:"Xolodilniki"

    },
    {
        id: "freezers",
        name: "Морозильные лари",
        slug:"Morozilnik"

    },
    {
        id: "conditioners",
        name: "Кондиционеры",
        slug:""
    },
    {
        id: "ovens",
        name: " Встраиваемые техники LEVO",
        slug:""
    },
];


export const Catalog: FC = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [
            {
                "@type": "Product",
                name: "Стиральные машины Levo",
                url: "https://levo.kg/catalogs/stiralnay-mashina",
            },
            {
                "@type": "Product",
                name: "Холодильники Levo",
                url: "https://levo.kg/catalogs/Xolodilniki",
            },
            {
                "@type": "Product",
                name: "Морозильные лари Levo",
                url: "https://levo.kg/catalogs/Morozilnik",
            },
            {
                "@type": "Product",
                name: "Кондиционеры Levo",
                url: "https://levo.kg/catalogs/kondicionery",
            },
        ],
    };


    return (
        <section id="hero-catalog" className="bg-[#EEEFF2] pb-8 pt-8">
            <Container className="mt-0 mx-auto">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Каталог бытовой техники Levo
                </h2>
                <ExploreGrid />
                <Script id="catalog-schema" type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </Script>
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

                        <Link href="/catalogs/stiralnay-mashina" className={`flex z-20`} prefetch>
                            <span className={`text-white flex z-30 absolute bottom-6 text-base md:text-2xl `}>Стиральные машины LEVO</span>
                            <Image
                                src="https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/WhatsApp%20Image%202025-10-01%20at%2008.09.00.jpeg"
                                alt="Стиральные машины"
                                className="object-cover z-10 absolute"
                                fill
                                sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
                            />
                        </Link>
                    </div>
                <div
                    className="spect-square flex relative items-center bg-gray-800/70 p-4 box-border min-h-48 md:h-auto">
                    <Link href={'/catalogs/Xolodilniki'} className={`flex z-20`} prefetch>
                        <span className={`text-white flex z-30 absolute bottom-6 text-base`}> Холодильники
                            Levo</span>
                        <Image
                            src={'https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/ChatGPT%20Image%201%20%D0%BE%D0%BA%D1%82.%202025%20%D0%B3.%2C%2011_21_08.png'}
                            alt={'Холодильники Levo'} className="object-cover" fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"/>
                    </Link>

                </div>
                <div
                    className="spect-square flex relative items-center bg-gray-800/70 p-4 box-border min-h-48  md:h-auto">
                    <Link className={`flex z-20`} href={'/catalogs/Morozilnik'} prefetch>
                        <span className={`text-white flex z-30 absolute bottom-6 text-base`}>Морозильные лари LEVO</span>
                        <Image
                            src={'https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/0b1280a7-115f-4199-8045-0f2b21753e20.jpg'}
                            alt={'Морозильные лари/all'} className="object-cover" fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"/>
                    </Link>

                </div>
                <div
                    className="spect-square flex relative items-center bg-gray-800/70 p-4 box-border min-h-48 md:h-auto">
                    <Link  className={`flex z-20`} href={'/catalogs/kondicionery'} prefetch>
                        <span className={`text-white flex z-30 absolute bottom-6 text-base`}>Кондиционеры LEVO</span>
                        <Image src={'https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/4a2d52f2-83c1-4de7-b793-89eb5e87c5f8.png'} alt={'Кондиционеры LEVO'} className="object-cover" fill
                               sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"/>
                    </Link>

                </div>
                <div
                    className="spect-square flex relative items-center bg-gray-800/70 p-4 box-border min-h-48 md:h-auto">
                    <Link className={`flex z-20`}  href={'/catalogs/'} prefetch>
                        <div
                            className="absolute top-8
                            left-[-35px] w-40 text-center
                            bg-yellow-400 text-black text-sm font-bold py-1
                            font-sans
                            z-30
                            rotate-[-45deg] shadow-md">
                            Скоро
                        </div>
                        <span className={`text-white flex z-30 absolute bottom-6 text-base`}>
                            Встраиваемые техники LEVO
                        </span>
                        <Image src={'https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/wwitxv1fuuhn5thn2i84i1l6jmb5gh37.jpg'} alt={'встраиваемый техника'} className="object-cover" fill
                               sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"/>
                    </Link>

                </div>
            </div>

        </div>
    );
}