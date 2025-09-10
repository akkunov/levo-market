"use client";
import {FC} from "react"
import Link from "next/link";
import Image from "next/image";
import Container from "@/app/components/container/Container";
import { PiPhone } from "react-icons/pi";


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
            <header className="absolute top-0 left-0 w-full z-20 max-h-[60px] bg-gray-300/30 box-border">
                <Container className={`mx-auto flex items-center justify-between px-6 py-2 text-white`}>
                    <Burger />
                        <Link href="/" className="text-2xl font-bold">
                            <Image src={'/logo.svg'} alt={'logo'}  width={75} height={75}/>
                        </Link>
                    <div className={`flex flex-col`}>
                        <div className={`flex flex-row items-center gap-x-1 justify-center`}>
                            <span>0551 06 90 04</span>
                            <PiPhone />
                        </div>
                        <div className={`flex flex-row items-center gap-x-1 justify-center`}>
                            <span>0551 06 90 04</span>
                            <PiPhone />
                        </div>

                    </div>
                </Container>

            </header>
        )
}