

import { ReactNode } from "react";

import {Header} from "@/app/components/header/Header";
import Container from "@/app/components/container/Container";
import {Metadata} from "next";

interface CatalogLayoutProps {
    children: ReactNode;
}
export const metadata: Metadata = {
    title: "Каталог LEVO — бытовая техника в Кыргызстане",
    description:
        "Каталог бытовой техники LEVO: холодильники, стиральные машины, микроволновки. Доставка по Кыргызстану.",
    openGraph: {
        title: "Каталог LEVO",
        description: "Официальный каталог бытовой техники LEVO",
        url: "https://levo.kg/catalogs",
        type: "website",
        images: [
            {
                url: "https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/banner.jpeg",
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: ["https://pub-70284751a4884f90bf14b3714880cdef.r2.dev/uploads/banner.jpeg"],
    },
};

export default function CatalogLayout({ children }: CatalogLayoutProps) {

    return (
        <>
            <Header/>
                <main>
                    <Container className={`mx-auto pt-16`}>
                        {children}
                    </Container>
                </main>
        </>

    );
}
