import { FC } from "react";
import Image from "next/image";

type Props = {
    image: string;
    name: string;
    description?: string;
}

const WashMachine: FC<Props> = ({image, name}) => {
    return (
        <div className="min-w-[250px] max-w-[320px] w-full flex flex-col bg-white gap-2 rounded-xl p-3">
            {/* Контейнер для изображения с соотношением сторон */}
            <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
                <Image
                    src={image}
                    alt="Стиральная машина Levo WashLite 600"
                    fill
                    className="object-contain"
                />
            </div>

            <h1 className="font-[var(--font-next)] text-sm text-black">
                {name}
            </h1>
            <h2 className="font-[var(--font-next)] text-sm text-black">6 кг</h2>
            <span className="text-[8px] text-black font-light">
        Максимальная загрузка белья
      </span>

            <h2 className="font-[var(--font-next)] text-sm text-black">
                595 × 470 × 850 мм
            </h2>
            <span className="text-[8px] text-black font-light">
        Габариты (ШxГxВ)
      </span>

            <h2 className="font-[var(--font-next)] text-sm text-black">
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
