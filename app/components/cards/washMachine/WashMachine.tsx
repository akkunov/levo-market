import {FC} from "react";
import Image from "next/image";


const WashMachine:FC = () => {
    return (
        <div className={`w-[320px] h-[430] flex flex-col align-center bg-white gap-1 rounded-xl p-2`}>
            <div className={`w-[290px] h-[215px]`} aria-label='Image container'>
                <Image src={`/demo/washMachine.png`} aria-label={'стиральная машина'} alt="Холодильник Levo из нержавеющей стали" className={`object-cover`} width={290} height={215}/>
            </div>
            <h1 className={`font-[var(--font-next)] text-sm text-black`}>Стиральная машина Levo WashLite 600</h1>
            <h2 className={`font-[var(--font-next)] text-sm text-black`} >6 кг</h2>
            <span className={`text-[8px] text-black font-light`}>Максимальная загрузка белья</span>

            <h2 className={`font-[var(--font-next)] text-sm text-black`} >595 × 470 × 850 мм</h2>
            <span className={`text-[8px] text-black font-light`}>Габариты (ШxГxВ)</span>

            <h2 className={`font-[var(--font-next)] text-sm text-black`} >1000 об/мин</h2>
            <span className={`text-[8px] text-black font-light`}>Скорость отжима</span>

            <button aria-label={`Кнопка подробнее`} className={`p-2 w-full text-start bg-[#1D1D1D] text-white text-base rounded-md`}>
                Подробнее ...
            </button>
        </div>
    )
}

export default WashMachine;
