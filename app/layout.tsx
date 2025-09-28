import type {Metadata} from "next"
import {Geist, Geist_Mono} from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const geistSans = Geist({variable: "--font-geist-sans", subsets: ["latin"]})
const geistMono = Geist_Mono({variable: "--font-geist-mono", subsets: ["latin"]})
const porscheNext = localFont({
    src: [{path: "../public/fonts/PorscheNext.ttf", weight: "400", style: "normal"}],
    variable: "--font-porsche-next",
})

export const metadata: Metadata = {
    title: "Levo бытовые техники",
    description: "Бытовые техники для вашего дома",
    icons: {icon: "/blackLogo.svg"},
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body className={`${geistSans.variable} ${geistMono.variable} ${porscheNext.variable} antialiased`}>
            {children}
            </body>
        </html>
    )
}
