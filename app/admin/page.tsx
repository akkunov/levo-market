'use client'

import {useRouter} from "next/navigation";
import {useEffect} from "react";


export default function AdminProductsPage() {
    const router = useRouter()
    useEffect(() => {
        router.push('admin/products')
    }, [])

    return <></>

}
