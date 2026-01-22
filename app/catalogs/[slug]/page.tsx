import CatalogPage from "@/app/pages/CatalogPage";


type PageProps = {
    params: {
        slug: string
    }
}
export default async  function CatalogSlugPage({params}: PageProps) {


    const {slug} = await params
    console.log(slug)

    return <CatalogPage slug={slug} />
}
