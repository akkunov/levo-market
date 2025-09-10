import { FC } from "react";
import {Radio} from "@/app/components/ui/Radio";

export const Filter: FC = () => {
    return (
        <div className={`max-w-[270px] w-full flex flex-col gap-y-2`}>
            <Radio  label={'Стиральная машина'}  className={`text-nowrap text-base`}/>
            <Radio  label={'Холодильник'} className={`text-nowrap text-base`}/>
            <Radio  label={'Морозильный ларь'} className={`text-nowrap text-base`}/>
            <Radio  label={'Кондиционер'} className={`text-nowrap text-base`}/>
            <Radio  label={'Духовые шкафы'} className={`text-nowrap text-base`}/>
            <Radio  label={'Варочные поверхности'} className={`text-nowrap text-base`}/>
        </div>
    );
}