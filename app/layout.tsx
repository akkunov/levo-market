import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Header} from "@/app/components/header/Header";
import localFont from "next/font/local";
import { ReactNode } from "react";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],

});
const porscheNext = localFont({
    src: [
        {
            path: "../public/fonts/PorscheNext.ttf",
            weight: "400",
            style: "regular",
        },
    ],
    variable: "--font-porsche-next",
})


export const metadata: Metadata = {
  title: "Levo бытовые техники",
  description: "Бытовые техникн для вашего дома ",
  icons: {
    icon: "/blackLogo.svg",

  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${porscheNext.variable} antialiased`}
      >
      <Header />
        {children}
      </body>
    </html>
  );
}
