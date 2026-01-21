// app/catalog/page.tsx
import {getCatalogs, getProducts} from "@/shared/catalog.service";
import Link from "next/link";
import Image from "next/image";

export default async function CatalogPage() {
    const catalogs = await getCatalogs();
    const products = await getProducts();
    console.log(products);

    return (
        <div>
            <ul>
                {catalogs.map(c => (
                    <li key={c.id}>{c.name}</li>
                ))}
            </ul>
            {/* Товары */}
            <main className="col-span-12 md:col-span-9">

                <div className="flex flex-col gap-4">
                            <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 pl-4`}>
                                {
                                    products?.map((p) => (
                                        <Link href={`/catalogs/`} key={p.id}>
                                            <div className="border rounded-lg p-2 flex flex-col">
                                                <Image
                                                    src={p.image || "/noPoster.jpg"}
                                                    alt={p.title}
                                                    width={250}
                                                    height={250}
                                                    className="w-full h-40 object-contain rounded-md"
                                                />
                                                <h2 className="font-semibold">{p.title}</h2>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                </div>
            </main>
        </div>
    )
}
