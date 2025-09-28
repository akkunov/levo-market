"use client";
import {FC, useState} from "react"
import Link from "next/link";
import Image from "next/image";
import Container from "@/app/components/container/Container";
import {PiPhone} from "react-icons/pi";

const Burger: FC = () => {
    return (
        <button aria-label="Открыть меню" className={`cursor-pointer`}>
            <svg width="36" height="22" viewBox="0 0 36 22" fill="none" xmlns="http://www.w3.org/2000/svg"
                 className="w-[25px] md:w-[36px]">
                <rect width="36" height="2" fill="#FDF5F5"/>
                <rect y="10" width="36" height="2" fill="#FDF5F5"/>
                <rect y="20" width="36" height="2" fill="#FDF5F5"/>
            </svg>
        </button>
    )
}


export const Header: FC = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <header className="absolute top-0 left-0 w-full z-20 bg-gray-900 box-border">
                <Container className="mx-auto flex items-center justify-between px-2 base:px-6 lg:py-2 py-0 text-white">
                    <div
                        className="flex flex-row gap-2 text-sm md:text-2xl items-center justify-center cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <Burger />
                        Меню
                    </div>

                    <Link href="/" className="text-2xl font-bold">
                        <Image
                            src={"/logo.svg"}
                            alt={"logo"}
                            width={75}
                            height={75}
                            className="w-[50px] h-[50px] md:w-full md:h-full"
                        />
                    </Link>

                    <div className="flex flex-col">
                        <a href="tel:+996776666878"
                           className="flex flex-row items-center gap-x-1 justify-center text-sm md:text-xl">
                            <span>0776 666 878</span>
                            <PiPhone/>
                        </a>
                        <a href="tel:+996776666878"
                           className="flex flex-row items-center gap-x-1 justify-center text-sm md:text-xl">
                            <span>0776 666 878</span>
                            <PiPhone/>
                        </a>
                    </div>
                </Container>
            </header>

            {/* Боковое меню */}
            {open && (
                <div className="fixed inset-0 z-30 flex">
                    {/* затемнение */}
                    <div
                        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
                        onClick={() => setOpen(false)}
                    />

                    {/* само меню */}
                    <aside
                        className={`relative w-64 bg-white h-full shadow-lg p-6 z-40 transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
                    >
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-black"
                        >
                            ✕
                        </button>
                        <nav className="mt-10 flex flex-col gap-4">
                            <Link href="/" onClick={() => setOpen(false)} className="hover:text-blue-600">Главная</Link>
                            <Link href="/products" onClick={() => setOpen(false)}
                                  className="hover:text-blue-600">Продукты</Link>
                            <Link href="/#contacts" onClick={() => setOpen(false)}
                                  className="hover:text-blue-600" scroll>Контакты</Link>
                            <Link href="/login" onClick={() => setOpen(false)}
                                  className="hover:text-blue-600" scroll>Войти</Link>
                        </nav>
                    </aside>
                </div>
            )}
        </>
    )
}
