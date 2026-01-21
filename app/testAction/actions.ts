// app/catalog/actions.ts
'use server'

import { revalidateTag } from 'next/cache'
import {createCatalog} from "@/shared/catalog.service";

export async function createCatalogAction(formData: FormData) {
    const name = formData.get('name') as string
    const slug = formData.get('slug') as string

    await createCatalog({ name, slug })

    revalidateTag('catalogs',{})
}
