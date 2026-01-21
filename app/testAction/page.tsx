
import {getCatalogs} from "@/shared/catalog.service";

export default async function CatalogPage() {
    const catalogs = await getCatalogs();

    return (
        <div>
            <ul>
                {catalogs.map(c => (
                    <li key={c.id}>{c.name}</li>
                ))}
            </ul>
        </div>
    )
}
