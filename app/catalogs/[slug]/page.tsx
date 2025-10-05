'use client'

import CatalogPage from "@/app/pages/CatalogPage";
import {Suspense} from "react";
import Spinner from "@/app/components/ui/Spinner";
import {useParams} from "next/navigation";


export default function CatalogSlugPage() {
    const params = useParams<{slug: string;}>()
    const {slug} = params;
    return <Suspense fallback={<Spinner />}>
        <CatalogPage slug={slug}/>
    </Suspense>
}
