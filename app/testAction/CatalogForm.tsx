// app/catalog/CatalogForm.tsx
'use client'

import { createCatalogAction } from './actions'

export default function CatalogForm() {
    return (
        <form action={createCatalogAction}>
            <input name="name" placeholder="Name" required />
            <input name="slug" placeholder="Slug" required />
            <button type="submit">Создать</button>
        </form>
    )
}
