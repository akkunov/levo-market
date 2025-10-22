// app/layout.tsx
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import React, {ReactNode} from "react";
import Script from "next/script";

const geistSans = Geist({variable: "--font-geist-sans", subsets: ["latin"]});
const geistMono = Geist_Mono({variable: "--font-geist-mono", subsets: ["latin"]});
const porscheNext = localFont({
    src: [{path: "../public/fonts/PorscheNext.ttf", weight: "400", style: "normal"}],
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
    alternates: {canonical: "https://levo.kg/"},
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
    icons: {icon: "/blackLogo.svg"},
};

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="ru">
            <head>
                {/* Google Analytics 4 */}
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-0T308V6RFM"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-0T308V6RFM', {
                  page_path: window.location.pathname,
                });
              `}
                </Script>

                {/* JSON-LD — организация и сайт */}
                <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "LEVO",
                        "url": "https://levo.kg",
                        "logo": "https://levo.kg/blackLogo.svg",
                        "sameAs": [
                            "https://www.instagram.com/levo_kg/",
                            "https://www.facebook.com/levo_kg/"
                        ]
                    })}
                </Script>

                <Script id="json-ld-website" type="application/ld+json" strategy="afterInteractive">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "url": "https://levo.kg",
                        "name": "LEVO — бытовая техника",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://levo.kg/search?q={search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    })}
                </Script>
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} ${porscheNext.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
