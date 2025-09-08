"use client";
import {FC} from "react"
import Link from "next/link";
import Image from "next/image";
const Burger : FC = () => {
    return (
        <svg width="36" height="22" viewBox="0 0 36 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="2" fill="#FDF5F5"/>
            <rect y="10" width="36" height="2" fill="#FDF5F5"/>
            <rect y="20" width="36" height="2" fill="#FDF5F5"/>
        </svg>
    )
}


export const Header: FC  = () => {
        return(
            <header className="absolute top-0 left-0 w-full z-20 bg-transparent">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 text-white">
                    <Link href="/" className="text-2xl font-bold">
                        <Image src={'/logo.svg'} alt={'logo'}  width={45} height={45}/>
                    </Link>
                    <nav className="space-x-6">
                        <Link href="/about" className="hover:underline">О нас</Link>
                        <Link href="/catalog" className="hover:underline">Каталог</Link>
                        <Link href="/contact" className="hover:underline">Контакты</Link>
                    </nav>
                </div>
            </header>
        )
}