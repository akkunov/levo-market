import CatalogPage from "@/app/pages/CatalogPage";
import {Suspense} from "react";
import Spinner from "@/app/components/ui/Spinner";

export default function CatalogsPage() {
    return <Suspense fallback={<Spinner />}>
        <CatalogPage />
    </Suspense>
}
