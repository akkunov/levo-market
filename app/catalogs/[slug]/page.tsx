import CatalogPage from "@/app/pages/CatalogPage";


export default async  function CatalogSlugPage({params}: {
    params: Promise<{ slug: string }>;
}) {
    const {slug} = await params
    return <CatalogPage slug={slug} />
}
