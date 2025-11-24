"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { IoMdArrowDown } from "react-icons/io";

export default function Hero() {
    return (
        <>
            <Head>
                <title>LEVO — умная бытовая техника в Бишкеке</title>
                <meta
                    name="description"
                    content="Купить бытовую технику LEVO в Бишкеке: стиральные машины, холодильники, морозильные лари, духовые шкафы, варочные панели. Доставка и гарантия."
                />
                <meta property="og:title" content="LEVO — умная техника для вашего дома" />
                <meta
                    property="og:description"
                    content="Современные решения, которые упрощают жизнь каждый день."
                />
                <meta property="og:image" content="https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/herosdgs.png" />
            </Head>

            <div className="relative w-full h-screen overflow-hidden p-2">
                {/* Пока видео не готово — показываем картинку */}

                <Image
                    src="https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/herosdgs.png"
                    alt="Hero"
                    className="w-full h-full object-cover"
                    fill
                    priority
                />
                {/* Контент поверх */}
                <div
                    className="absolute inset-0 z-10 flex items-center justify-center text-white text-center bg-black/30 p-2" >
                    <div>
                        <h1 className="text-3xl md:text-6xl font-bold text-start leading-tight">
                            Бытовая техника LEVO — умные решения для вашего дома
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-start max-w-2xl">
                            <strong>Levo KG</strong> предлагает широкий выбор бытовой техники:
                            <strong>стиральные машины, холодильники, кондиционеры, морозильники</strong> и встраиваемые
                            решения.
                            Быстрая доставка по всему Кыргызстану и гарантия качества.
                        </p>
                        <Link
                            href="/#hero-catalog"
                            scroll={true}
                            className="flex flex-row justify-between items-center rounded-sm p-2 mt-4 bg-[#1D1D1D] text-white whitespace-nowrap active:bg-[#1D1D1D]/80 w-42"
                        >
                            Смотреть каталог...
                            <IoMdArrowDown/>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
