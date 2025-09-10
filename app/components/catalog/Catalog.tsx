import {FC} from "react";
import WashMachine from "@/app/components/cards/washMachine/WashMachine";

export const Catalog : FC = () => {
    return (
        <div className={`flex flex-row columns-3 gap-x-4`}>
            <WashMachine />
            <WashMachine />
            <WashMachine />
        </div>
    )
}