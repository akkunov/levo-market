"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { IoMdArrowDown } from "react-icons/io";
import {useEffect, useRef, useState} from "react";
import {BsPauseFill, BsPlayFill} from "react-icons/bs";

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isDomReady, setIsDomReady] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Отмечаем, что DOM полностью смонтирован
    useEffect(() => {
        setIsDomReady(true);
        const video = videoRef.current;
        if (!video) return;

    }, []);

    useEffect(() => {
        if (isDomReady && videoRef.current) {
            setIsVideoPlaying(true)
            videoRef.current.play().catch((err) => {
                console.warn("Не удалось воспроизвести видео автоматически:", err);
            });
        }
    }, [isDomReady]);

    const toggleVideo = () => {
        const video = videoRef?.current
        if(!video) return
        if(video.paused){
            video.play()
            setIsVideoPlaying(true)
        }else {
            video.pause()
            setIsVideoPlaying(false)
        }
    };




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

            <div className="relative w-full h-screen overflow-hidden">
                {/* Пока видео не готово — показываем картинку */}

                <Image
                    src="https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/herosdgs.png"
                    alt="Hero"
                    className="w-full h-full object-cover"
                    fill
                    priority
                />
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    loop
                    className={`absolute top-0 right-0 w-full h-full object-cover transition-opacity duration-700 ${
                        isDomReady ? "opacity-100" : "opacity-0"
                    }`}
                    poster="https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/herosdgs.png"
                >
                    <source src="/video/bg2.webm" type="video/webm"/>
                </video>

                {/* Контент поверх */}
                <button
                    onClick={toggleVideo}
                    className="z-20 absolute bottom-6 right-10 p-3 bg-black/50 text-white rounded-full text-2xl hover:bg-black/70 transition"
                >
                    {isVideoPlaying ? <BsPauseFill/> : <BsPlayFill/>}
                </button>
                <div
                    className="absolute inset-0 z-10 flex items-center justify-center text-white text-center bg-black/30">
                    <div>
                        <h1 className="text-2xl md:text-6xl font-bold text-start">Добро пожаловать в LEVO</h1>
                        <p className="mt-4 text-md md:text-xl text-start">Умная техника для вашего дома</p>
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
