import Image from "next/image";
import Container from "@/app/components/container/Container";
import Link from "next/link";
import Head from "next/head";

export default function Hero() {
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
                <meta property="og:image" content="/hero.png" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org/",
                            "@type": "Store",
                            name: "LEVO",
                            image: "/hero.png",
                            telephone: "+996551069004",
                            address: {
                                "@type": "PostalAddress",
                                addressLocality: "Бишкек",
                                addressCountry: "KG"
                            },
                            url: "https://levo-market.vercel.app"
                        }),
                    }}
                />
            </Head>

            <section className="relative h-screen w-full">
                <Image
                    src="/hero.png"
                    alt="LEVO — умная бытовая техника для вашего дома"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black-300/5" />
                <Container className="relative z-10 flex h-full items-center justify-start px-10">
                    <div className="max-w-xl text-white">
                        <h1 className="text-4xl font-bold">
                            LEVO — умная техника для вашего дома
                        </h1>
                        <p className="mt-4 text-lg text-gray-200">
                            Современные решения, которые упрощают жизнь каждый день.
                        </p>
                        <Link href={{ pathname: '/', hash: 'hero-catalog' }} scroll={true}>
                            <button className="px-6 py-3 bg-[#1D1D1D] text-white font-semibold rounded-lg hover:bg-gray-800 transition">
                                Смотреть каталог
                            </button>
                        </Link>
                    </div>
                </Container>
            </section>
        </>
    );
}