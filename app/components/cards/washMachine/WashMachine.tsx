import { FC } from "react";
import Image from "next/image";

type Props = {
    image: string;
    name: string;
    description?: string;
    alt: string;
}

const WashMachine: FC<Props> = ({image, name,alt}) => {
    return (
        <div className="min-w-[200px] max-w-[320px] w-full flex flex-col bg-white gap-2 rounded-xl p-3 font-[var(--font-next)]">
            {/* Контейнер для изображения с соотношением сторон */}
            <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
                <Image
                    src={image}
                    alt={alt}
                    fill
                    className="object-contain"
                />
            </div>

            <h1 className=" text-sm text-black font-bold">
                {name}
            </h1>
            <h2 className=" text-sm text-black font-bold">6 кг</h2>
            <span className="text-[8px] text-black font-light">
        Максимальная загрузка белья
      </span>

            <h2 className=" text-sm text-black font-bold">
                595 × 470 × 850 мм
            </h2>
            <span className="text-[8px] text-black font-light">
        Габариты (ШxГxВ)
      </span>

            <h2 className="text-sm text-black font-bold">
                1000 об/мин
            </h2>
            <span className="text-[8px] text-black font-light">Скорость отжима</span>

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
