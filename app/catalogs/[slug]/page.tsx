import CatalogPage from "@/app/pages/CatalogPage";
import {Suspense} from "react";
import Spinner from "@/app/components/ui/Spinner";

type PageProps = {
    params: {
        slug: string
    }
}
export default async  function CatalogSlugPage({params}: PageProps) {


    const {slug} = await params
    console.log(slug)

    return <Suspense fallback={<Spinner />}>
        <CatalogPage slug={slug} />
    </Suspense>
}
