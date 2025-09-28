'use client'

import {useEffect, useMemo, useState, ChangeEvent, FormEvent, use} from 'react'
import { useRouter } from 'next/navigation'
import { FiArrowLeft, FiX, FiTrash2, FiSave } from 'react-icons/fi'
import type { Category, Product } from '@prisma/client'
import Spinner from "@/app/components/ui/Spinner";
import Image from "next/image";

// Convert multiline "key - value" text to JSON
function parseCharacteristics(input: string): Record<string, string> {
    const lines = input.split('\n').map(l => l.trim()).filter(Boolean)
    const obj: Record<string, string> = {}

    for (const line of lines) {
        const parts = line.split(/[-–—:]/)
        const key = parts.shift()
        const value = parts.join('-')
        if (key && value) {
            obj[key.trim()] = value.trim()
        }
    }
    return obj
}

// Convert JSON characteristics to display-friendly lines
function stringifyCharacteristics(obj: unknown): string {
    if (!obj || typeof obj !== 'object') return ''
    const entries = Object.entries(obj as Record<string, unknown>)
    return entries.map(([k, v]) => `${k} - ${String(v ?? '')}`).join('\n')
}
type Props = {
    params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: Props) {
    const router = useRouter()
    const {id} = use(params)

    const [initialProduct, setInitialProduct] = useState<Product | null>(null)
    const [categories, setCategories] = useState<Category[]>([])

    const [form, setForm] = useState({
        name: '',
        price: '',
        type: '',
        photoUrl: '',
        characteristicsText: '',
        categoryId: '',
    })

    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loadingPage, setLoadingPage] = useState(true)



    // Load product and categories
    useEffect(() => {
        let mounted = true
        async function load() {
            try {
                setLoadingPage(true)
                const [prodRes, catRes] = await Promise.all([
                    fetch(`/api/admin/products/${id}`),
                    fetch('/api/admin/categories'),
                ])

                if (!prodRes.ok) {
                    setLoadingPage(false)
                    const d = await prodRes.json().catch(() => ({}))
                    throw new Error(d.error || 'Не удалось загрузить продукт')
                }
                if (!catRes.ok) {
                    setLoadingPage(false)
                    const d = await catRes.json().catch(() => ({}))
                    throw new Error(d.error || 'Не удалось загрузить категории')
                }

                const prod: Product = await prodRes.json()
                const cats: Category[] = await catRes.json()

                if (!mounted) return
                setInitialProduct(prod)
                setCategories(cats)
                setForm({
                    name: prod.name,
                    price: String(prod.price ?? ''),
                    type: prod.type ?? '',
                    photoUrl: prod.photoUrl ?? '',
                    characteristicsText: stringifyCharacteristics(prod.characteristics),
                    categoryId: prod.categoryId ?? '',
                })
                setPreview(prod.photoUrl ?? null)
                setLoadingPage(false)
            } catch (e: unknown) {
                setLoadingPage(false)
                if (e instanceof Error) setError(e.message)
                else setError('Неизвестная ошибка')
            }
        }
        load()

        return () => {
            mounted = false
            if (preview && preview.startsWith('blob:')) {
                URL.revokeObjectURL(preview)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    // Handle new file selection (local preview only)
    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0]
        if (!f) return
        setFile(f)

        // Revoke previous blob URL if present
        if (preview && preview.startsWith('blob:')) {
            URL.revokeObjectURL(preview)
        }
        const blobUrl = URL.createObjectURL(f)
        setPreview(blobUrl)
    }

    // Remove a selected photo (does not change DB yet)
    function handleRemovePhoto() {
        setFile(null)
        if (preview && preview.startsWith('blob:')) {
            URL.revokeObjectURL(preview)
        }
        // If we had an existing photo, keep its URL in form.photoUrl so user can still submit without change
        setPreview(form.photoUrl || null)
    }

    // Submit: optionally upload a new file, then PUT product
    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            let newPhotoUrl = form.photoUrl // default to existing URL

            // If user selected a new file, upload it first
            if (file) {
                const fd = new FormData()
                fd.append('file', file)

                const uploadRes = await fetch('/api/upload', { method: 'POST', body: fd })
                if (!uploadRes.ok) {
                    const d = await uploadRes.json().catch(() => ({}))
                    throw new Error(d.error || 'Ошибка загрузки фото')
                }
                const uploaded = await uploadRes.json() as { url: string }
                newPhotoUrl = uploaded.url
            }

            const characteristics =
                form.characteristicsText.trim()
                    ? parseCharacteristics(form.characteristicsText)
                    : null

            const res = await fetch(`/api/admin/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    price: parseFloat(form.price),
                    type: form.type,
                    photoUrl: newPhotoUrl || null,
                    characteristics,
                    categoryId: form.categoryId || null,
                }),
            })

            if (!res.ok) {
                const d = await res.json().catch(() => ({}))
                throw new Error(d.error || 'Ошибка при обновлении продукта')
            }

            // API will delete the old photo from R2 if photoUrl changed
            await res.json()
            router.push('/admin')
            router.refresh()
        } catch (e: unknown) {
            if (e instanceof Error) setError(e.message)
            else setError('Неизвестная ошибка')
        } finally {
            setLoading(false)
        }
    }

    // Delete product (and its photo in R2 via API)
    async function handleDelete() {
        if (!initialProduct) return
        const ok = window.confirm('Удалить продукт? Действие необратимо.')
        if (!ok) return

        setError(null)
        setDeleting(true)
        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE',
            })
            if (!res.ok) {
                const d = await res.json().catch(() => ({}))
                throw new Error(d.error || 'Ошибка при удалении продукта')
            }
            await res.json()
            router.push('/admin')
            router.refresh()
        } catch (e: unknown) {
            if (e instanceof Error) setError(e.message)
            else setError('Неизвестная ошибка')
        } finally {
            setDeleting(false)
        }
    }

    const canSubmit = useMemo(() => {
        return form.name.trim() && form.price.trim() && form.type.trim()
    }, [form.name, form.price, form.type])

    if (loadingPage) {
        return (
            <div className="min-h-screen bg-[#E7E7E3] flex items-center justify-center">
                <Spinner />
            </div>
        )
    }else {
        return (
            <div className="min-h-screen bg-[#E7E7E3] p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Edit Product</h1>
                        <p className="text-sm text-gray-600">Home &gt; Products &gt; Edit</p>
                    </div>
                    <button
                        onClick={() => router.push('/admin')}
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
                    >
                        <FiArrowLeft /> Назад
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl bg-[#FAFAFA] shadow rounded-lg p-6 space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Название</label>
                            <input
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                required
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Цена</label>
                            <input
                                type="number"
                                value={form.price}
                                onChange={e => setForm({ ...form, price: e.target.value })}
                                required
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Тип</label>
                            <input
                                value={form.type}
                                onChange={e => setForm({ ...form, type: e.target.value })}
                                required
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Категория</label>
                            <select
                                value={form.categoryId}
                                onChange={e => setForm({ ...form, categoryId: e.target.value })}
                                className="w-full border p-2 rounded"
                            >
                                <option value="">Без категории</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Photo */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Фото</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        <div className="mt-2">
                            {preview ? (
                                <div className="relative inline-block w-42 h-42">
                                    <Image
                                        src={preview}
                                        alt="preview"
                                        className="object-contain rounded border"
                                        fill
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemovePhoto}
                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                                        title="Убрать выбранное фото"
                                    >
                                        <FiX />
                                    </button>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">Фото не выбрано</p>
                            )}
                        </div>
                        {form.photoUrl && !file && (

                            <p className="text-xs text-gray-500 mt-1">
                                Текущее фото: {form.photoUrl}
                            </p>
                        )}
                    </div>

                    {/* Characteristics */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Характеристики</label>
                        <textarea
                            rows={6}
                            placeholder="Каждая строка: ключ - значение"
                            value={form.characteristicsText}
                            onChange={e => setForm({ ...form, characteristicsText: e.target.value })}
                            className="w-full border p-2 rounded"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Пример:{" "}
                            цвет - белый{"\n"}
                            мощность - 200 ватт{"\n"}
                            Загрузка белья - 6кг{"\n"}
                            Скорость отжима - 1000 об/мин
                        </p>
                    </div>

                    {/* Errors */}
                    {error && (
                        <div className="text-red-600 text-sm bg-red-100 border border-red-300 rounded p-2">
                            {error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading || !canSubmit}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                        >
                            <FiSave /> {loading ? 'Сохраняем...' : 'Сохранить'}
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={deleting || !initialProduct}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                        >
                            <FiTrash2 /> {deleting ? 'Удаляем...' : 'Удалить продукт'}
                        </button>
                    </div>
                </form>
            </div>
        )
    }

}
