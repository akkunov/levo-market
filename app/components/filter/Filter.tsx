"use client"

import { FC } from "react"
import { Radio } from "@/app/components/ui/Radio"
import type { Catalog } from "@prisma/client"

type Props = {
    categories: Catalog[]
    selected: string | number
    action: (val: string | number) => void
}

export const Filter: FC<Props> = ({ categories, selected, action }) => {
    return (
        <div className="max-w-[270px] w-full flex flex-col gap-y-2">
            <Radio
                label="Все"
                checked={selected === "Все"}
                onChange={() => action("Все")}
                className="text-nowrap text-base"
            />
            {categories.map(cat => (
                <Radio
                    key={cat.id}
                    label={cat.name}
                    checked={selected === cat.id}
                    onChange={() => action(cat.id)}
                    className="text-nowrap text-base"
                />
            ))}
        </div>
    )
}
