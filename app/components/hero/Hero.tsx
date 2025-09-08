import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative h-screen w-full">
            {/* Фон-картинка */}
            <Image
                src="/hero.png"
                alt="Hero"
                fill
                priority
                className="object-cover"
            />

            {/* Затемняющий слой (по желанию) */}
            <div className="absolute inset-0 bg-gray-300/10" />

            {/* Контент */}
            <div className="relative z-10 flex h-full items-center justify-start px-10 ">
                <div className="max-w-xl text-white">
                    <h1 className="text-4xl font-bold">
                        LEVO — умная техника для вашего дома
                    </h1>
                    <p className="mt-4 text-lg text-gray-200">
                        Современные решения, которые упрощают жизнь каждый день.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
                        Смотреть каталог
                    </button>
                </div>
            </div>
        </section>
    );
}
