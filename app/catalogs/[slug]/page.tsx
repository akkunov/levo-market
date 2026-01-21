import CatalogPage from "@/app/pages/CatalogPage";
import {Suspense} from "react";
import Spinner from "@/app/components/ui/Spinner";


export default async  function CatalogSlugPage({
                                                   params,
                                               }: {
    params: Promise<{ slug: string }>; // Use the Promise type
}) {


    const { slug } = await params;

    return <Suspense fallback={<Spinner />}>
        <CatalogPage slug={slug} />
    </Suspense>
}
