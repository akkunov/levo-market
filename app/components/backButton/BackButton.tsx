'use client'

import { useRouter } from 'next/navigation'
import {Button} from "@/components/ui/button";
import {IoIosArrowRoundBack} from "react-icons/io";

export default function BackButton() {
    const router = useRouter()
    return <Button className="m-4 p-4"  type="button"
                   onClick={() => router.back()}>
        <IoIosArrowRoundBack /> Назад
    </Button>
}

