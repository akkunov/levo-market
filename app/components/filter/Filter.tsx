"use client"

import { FC } from "react"
import { Radio } from "@/app/components/ui/Radio"
import type { Category } from "@prisma/client"

type Props = {
    categories: Category[]
    selected: string
    onChange: (val: string) => void
}

export const Filter: FC<Props> = ({ categories, selected, onChange }) => {
    return (
        <div className="max-w-[270px] w-full flex flex-col gap-y-2">
            <Radio
                label="Все"
                checked={selected === "Все"}
                onChange={() => onChange("Все")}
                className="text-nowrap text-base"
            />
            {categories.map(cat => (
                <Radio
                    key={cat.id}
                    label={cat.name}
                    checked={selected === cat.id}
                    onChange={() => onChange(cat.id)}
                    className="text-nowrap text-base"
                />
            ))}
        </div>
    )
}
