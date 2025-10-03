"use client";



import CatalogPage from "@/app/pages/CatalogPage";
import {useParams} from "next/navigation";


export default function CatalogSlugPage() {
    const params = useParams()
    return <CatalogPage slug={params.slug} />;
}
