// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import {ReactNode} from "react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const porscheNext = localFont({
    src: [{ path: "../public/fonts/PorscheNext.ttf", weight: "400", style: "normal" }],
    variable: "--font-porsche-next",
});

export const metadata: Metadata = {
    title: "Levo KG — Бытовая техника в Кыргызстане | Купить бытовую технику Levo",
    description:
        "Официальный интернет-магазин Levo KG — бытовая техника для дома: холодильники, стиральные машины, микроволновки, духовые шкафы. Доставка и гарантия по всему Кыргызстану.",
    keywords: [
        "levo kg",
        "бытовая техника levo",
        "бытовая техника Кыргызстан",
        "купить бытовую технику",
        "холодильники levo",
        "стиральные машины levo",
        "levo бытовая техника",
        "купить бытовую технику в Бишкеке",
    ],
    metadataBase: new URL("https://levo.kg"),
    alternates: { canonical: "https://levo.kg/" },
    openGraph: {
        title: "Levo KG — Бытовая техника в Кыргызстане",
        description: "LEVO — официальный магазин бытовой техники в Кыргызстане. Современные решения для вашего дома.",
        url: "https://levo.kg",
        siteName: "Levo KG",
        images: [
            {
                url: "/og-levo.jpg",
                width: 1200,
                height: 630,
                alt: "Бытовая техника Levo в Кыргызстане",
            },
        ],
        locale: "ru_RU",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Levo KG — купить бытовую технику в Кыргызстане",
        description: "Официальный сайт LEVO. Бытовая техника с гарантией и доставкой по всей стране.",
        images: ["/og-levo.jpg"],
    },
    icons: { icon: "/blackLogo.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
        <body className={`${geistSans.variable} ${geistMono.variable} ${porscheNext.variable} antialiased`}>
        {children}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    name: "Levo KG",
                    url: "https://levo.kg",
                    logo: "https://levo.kg/blackLogo.svg",
                    sameAs: [
                        "https://www.instagram.com/levo_kg/",
                        "https://www.facebook.com/levo.kg"
                    ],
                    description:
                        "Официальный интернет-магазин бытовой техники Levo в Кыргызстане. Доставка, гарантия, сервис.",
                }),
            }}
        />
        </body>
        </html>
    );
}
