"use client"

import { FC } from "react"
import { Radio } from "@/app/components/ui/Radio"
import {Catalog} from "@/app/components/catalogTree/CatalogTree";


type Props = {
    categories: Catalog
    selected: string | number
    action: (val: string | number) => void
}

export const Filter: FC<Props> = ({ categories, selected, action }) => {
    console.log(categories)
    return (
        <div className="max-w-[270px] w-full flex flex-col gap-y-2">
            <Radio
                label={categories.name}
                checked={selected === "Все" || selected === categories.id}
                onChange={() => action("Все")}
                className="text-nowrap text-base"
            />
        </div>
    )
}
