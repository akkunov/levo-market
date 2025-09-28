'use client'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiArrowLeft } from 'react-icons/fi'
import { Category } from '@prisma/client'

export default function CreateCategoryPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [form, setForm] = useState({ name: '', slug: '' })
    const [error, setError] = useState<string | null>(null)
    const [creating, setCreating] = useState(false)
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        fetch('/api/admin/categories')
            .then(r => r.json())
            .then(setCategories)
            .catch(console.error)
    }, [])

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        setCreating(true)
        try {
            const res = await fetch('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (!res.ok) return  await res.json()
            const newCat = await res.json()
            setCategories(prev => [newCat, ...prev])
            setForm({ name: '', slug: '' })
        } catch  {
            setError('Ошибка при создании категории')
        } finally {
            setCreating(false)
        }
    }

    async function handleUpdate(c: Category) {
        setUpdatingId(c.id)
        setError(null)
        try {
            const res = await fetch(`/api/admin/categories/${c.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(c),
            })
            if (!res.ok) return  await res.json()
            const updated = await res.json()
            setCategories(prev => prev.map(x => (x.id === updated.id ? updated : x)))
        } catch  {
            setError( 'Ошибка при обновлении')
        } finally {
            setUpdatingId(null)
        }
    }

    async function handleDelete(id: string) {
        setDeletingId(id)
        setError(null)
        try {
            const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
            if (!res.ok) return  await res.json()
            setCategories(prev => prev.filter(c => c.id !== id))
        } catch {
            setError( 'Ошибка при удалении')
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Create Category</h1>
                    <p className="text-sm text-gray-600">Home &gt; Categories &gt; Create</p>
                </div>
                <button
                    onClick={() => router.push('/admin/categories')}
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
                >
                    <FiArrowLeft /> Назад
                </button>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="max-w-md bg-[#FAFAFA] shadow rounded-lg p-6 space-y-4"
            >
                <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Название категории"
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    value={form.slug}
                    onChange={e => setForm({ ...form, slug: e.target.value })}
                    placeholder="Slug (ссылка)"
                    required
                    className="w-full border p-2 rounded"
                />

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <button
                    type="submit"
                    disabled={creating}
                    className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
                >
                    {creating ? 'Создаём...' : 'Создать категорию'}
                </button>
            </form>

            {/* Список категорий */}
            <div className="flex flex-wrap gap-4 mt-6">
                {categories.map(c => (
                    <div
                        key={c.id}
                        className="bg-[#FAFAFA] shadow rounded-lg p-4 flex flex-col gap-2 w-64"
                    >
                        <input
                            defaultValue={c.name}
                            onChange={e => (c.name = e.target.value)}
                            className="border p-2 rounded"
                        />
                        <input
                            defaultValue={c.slug}
                            onChange={e => (c.slug = e.target.value)}
                            className="border p-2 rounded"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleUpdate(c)}
                                disabled={updatingId === c.id}
                                className="flex-1 p-2 rounded bg-blue-600 text-white disabled:opacity-50"
                            >
                                {updatingId === c.id ? 'Изменяем...' : 'Изменить'}
                            </button>
                            <button
                                onClick={() => handleDelete(c.id)}
                                disabled={deletingId === c.id}
                                className="flex-1 p-2 rounded bg-red-600 text-white disabled:opacity-50"
                            >
                                {deletingId === c.id ? 'Удаляем...' : 'Удалить'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
