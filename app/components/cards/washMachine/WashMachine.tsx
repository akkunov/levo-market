import {FC} from "react";
import Image from "next/image";

type Props = {
    category?: string | null;
    id: string;
    slug?: string;
    image: string | null;
    name: string;
    price: number;
    alt: string;
}

const WashMachine: FC<Props> = ({
                                    image = "https://dark-world.ru/files/bands/photos/Conception/dw_75589lf7.jpg",
                                    price,
                                    name,
                                    alt,
                                    category
                                }) => {
    return (
        <div
            className="border-[1px] border-gray-300 md:min-w-[150px] lg:min-w-[200px] max-w-[320px] w-full flex flex-col bg-white gap-1 lg:gap-2 p-1 md:p-3 rounded-xl  font-[var(--font-next)] hover:shadow-2xl">
            {/* Контейнер для изображения с соотношением сторон */}
            <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
                <Image
                    src={image || 'https://dark-world.ru/files/bands/photos/Conception/dw_75589lf7.jpg'}
                    alt={alt}
                    fill
                    className="object-contain"
                />
            </div>

            <span className={`text-sm text-black/80`}>{category}</span>
            <h1 className=" text-lg text-black">
                {name}
            </h1>

            <span className={`text-2xl mt-12`}>{price} <span className={`text-sm`}>сом</span></span>
            <button
                aria-label="Кнопка подробнее"
                className="p-2 w-full text-start bg-[#1D1D1D] text-white text-base rounded-md"
            >
                Подробнее ...
            </button>
        </div>
    );
};

export default WashMachine;
