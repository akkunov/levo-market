"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Container from "@/app/components/container/Container";
import {BsInstagram} from "react-icons/bs";

const Burger: FC<{ onClick: () => void }> = ({ onClick }) => (
    <Button variant="ghost" onClick={onClick} className="p-2">
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="24" height="2" fill="white" />
            <rect y="10" width="24" height="2" fill="white" />
            <rect y="20" width="24" height="2" fill="white" />
        </svg>
    </Button>
);

export const Header: FC = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Главная" },
        { href: "/catalogs", label: "Продукты" },
        { href: "/contacts", label: "Контакты" },
    ];

    // Отслеживаем прокрутку
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-40 shadow-md transition-all duration-300 bg-[#101828] text-white`}
            >
                <Container className="max-w-7xl mx-auto flex items-center justify-between px-2 py-2 md:py-4">
                    <div className="flex items-center gap-2">
                        <Burger onClick={() => setOpen(!open)} />
                        <span className="text-lg md:text-xl font-medium cursor-pointer">
              Меню
            </span>
                    </div>

                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={50}
                            height={50}
                            className="w-[25px] h-[25px] md:w-[25px] md:h-[25px] scale-300 mr-10"
                        />
                    </Link>

                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-end md:items-center text-sm md:text-base w-8 h-4">
                        <a
                            href="tel:+996776666878"
                            className="flex items-center gap-1 hover:text-blue-500"
                        >
                        </a>
                        <a
                            href="tel:+996776666878"
                            className="flex items-center gap-1 hover:text-blue-500"
                        >
                        </a>
                    </div>
                </Container>
            </header>

            {/* Боковое меню */}
            <div
                className={`fixed inset-0 z-50 flex transition-transform duration-300 ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* затемнение */}
                <div
                    className="fixed inset-0 bg-black/50"
                    onClick={() => setOpen(false)}
                />

                {/* меню */}
                <aside className="relative w-64 bg-gray-800 h-full shadow-lg p-6 z-40">
                    <Button
                        variant="ghost"
                        className="absolute top-4 right-4 text-white"
                        onClick={() => setOpen(false)}
                    >
                        ✕
                    </Button>

                    <nav className="pt-10 flex flex-col gap-4 justify-between h-full">
                        <div className={"flex flex-col gap-4"}>
                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className={`text-white hover:text-blue-500 transition-colors ${
                                            isActive ? "font-bold text-blue-400" : ""
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                        <ul className="text-md text-white grid grid-cols-1 max-w-1/2 p-2 gap-2 pb-8">
                            <li>
                                <Link
                                    href="https://www.instagram.com/levo_kg/"
                                    className="inline-flex items-center gap-2 hover:underline hover:text-gray-300"
                                    target={'_blank'}
                                >
                                    Instagram <BsInstagram/>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="mailto:levo.market.help@gmail.com"
                                    className="inline-flex items-center gap-2 hover:underline hover:text-gray-300"
                                    target={'_blank'}
                                >
                                    levo.market.help@gmail.com
                                </Link>
                            </li>
                        </ul>

                    </nav>
                </aside>
            </div>
        </>
    );
};
