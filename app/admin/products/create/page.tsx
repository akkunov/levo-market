'use client'
import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { FiArrowLeft, FiX } from 'react-icons/fi'
import { Category } from '@prisma/client'
import Image from "next/image";

export default function CreateProductPage() {
    const [form, setForm] = useState({
        name: '',
        price: '',
        type: '',
        photoUrl: '',
        characteristics: '',
        categoryId: '',
    })
    const [preview, setPreview] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [file, setFile] = useState<File | null>(null)

    const router = useRouter()


    // Загружаем категории
    useEffect(() => {
        fetch('/api/admin/categories')
            .then(r => r.json())
            .then(setCategories)
            .catch(console.error)
    }, [])

    function parseCharacteristics(input: string): Record<string, string> {
        const lines = input.split('\n').map(l => l.trim()).filter(Boolean)
        const obj: Record<string, string> = {}

        for (const line of lines) {
            // поддержка разделителей "-" или "—"
            const [key, ...rest] = line.split(/[-–—:]/)
            if (key && rest.length) {
                obj[key.trim()] = rest.join('-').trim()
            }
        }

        return obj
    }

    // Загрузка фото в R2
    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0]
        if (!f) return
        setFile(f)
        setPreview(URL.createObjectURL(f)) // локальный preview
    }

    // Удаление фото из предпросмотра
    function handleRemovePhoto() {
        setFile(null)
        setPreview(null)
    }

    // Создание продукта
    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            let photoUrl = ''

            // если файл выбран → загружаем его в R2
            if (file) {
                const formData = new FormData()
                formData.append('file', file)

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })
                if (!uploadRes.ok) {
                    const data = await uploadRes.json().catch(() => ({}))
                    throw new Error(data.error || 'Ошибка загрузки фото')
                }
                const data = await uploadRes.json()
                photoUrl = data.url
            }

            // создаём продукт в базе
            const res = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    price: parseFloat(form.price),
                    photoUrl,
                    characteristics: form.characteristics
                        ? parseCharacteristics(form.characteristics)
                        : null,
                }),
            })

            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                throw new Error(data.error || 'Ошибка при создании продукта')
            }

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

    return (
        <div className="min-h-screen bg-[#E7E7E3] p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Create Product</h1>
                    <p className="text-sm text-gray-600">Home &gt; Products &gt; Create</p>
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
                className="max-w-lg bg-[#FAFAFA] shadow rounded-lg p-6 space-y-4"
            >
                <input
                    placeholder="Название"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    placeholder="Цена"
                    type="number"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    placeholder="Тип (например: техника)"
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                    required
                    className="w-full border p-2 rounded"
                />

                {/* Upload */}
                <div>
                    <label className="block text-sm font-medium mb-1">Фото</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full"
                    />
                    {uploading && <p className="text-sm text-gray-500">Загружаем...</p>}
                    {preview && (
                        <div className="relative inline-block mt-2">
                            <Image
                                src={preview}
                                alt="preview"
                                className="w-40 h-40 object-cover rounded"
                                width={300}
                                height={300}
                            />
                            <button
                                type="button"
                                onClick={handleRemovePhoto}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                            >
                                <FiX />
                            </button>
                        </div>
                    )}
                </div>

                {/* Dropdown категорий */}
                <div>
                    <label className="block text-sm font-medium mb-1">Категория</label>
                    <select
                        value={form.categoryId}
                        onChange={e => setForm({ ...form, categoryId: e.target.value })}
                        required
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <textarea
                    placeholder='Характеристики (JSON, например: {"color":"white"})'
                    value={form.characteristics}
                    onChange={e => setForm({ ...form, characteristics: e.target.value })}
                    className="w-full border p-2 rounded"
                />

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
                >
                    {loading ? 'Создаём...' : 'Создать продукт'}
                </button>
            </form>
        </div>
    )
}
