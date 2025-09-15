'use client';

import Head from "next/head";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    const [showVideo, setShowVideo] = useState(true);
    setShowVideo(true)

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
                <meta property="og:image" content="/hero.png" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org/",
                            "@type": "Store",
                            name: "LEVO",
                            image: "/hero.png",
                            telephone: "+996551069004",
                            address: {
                                "@type": "PostalAddress",
                                addressLocality: "Бишкек",
                                addressCountry: "KG"
                            },
                            url: "https://levo-market.vercel.app"
                        }),
                    }}
                />
            </Head>

            <div className="relative w-full h-screen overflow-hidden">
                {!showVideo ? (
                    <Image
                        src="/hero.png"
                        alt="Hero"
                        className="w-full h-full object-cover"
                        fill
                        loading={"lazy"}

                    />
                ) : (
                    <video
                        autoPlay
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        poster="/hero.png"
                    >
                        <source src="/video/bg.webm" type="video/webm"/>
                    </video>
                )}

                {/* Контент поверх */}
                <div className="absolute inset-0 z-10 flex items-center justify-center text-white text-center bg-black/30">
                    <div>
                        <h1 className="text-2xl md:text-6xl font-bold text-start">Добро пожаловать в LEVO</h1>
                        <p className="mt-4 text-md md:text-xl text-start">Умная техника для вашего дома</p>
                        <Link rel="stylesheet" href="#" className={`rounded-sm p-2 mt-4 bg-[#1D1D1D] text-white block active:bg-[#1D1D1D]/80 w-32`}>
                            Подробнее...
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}