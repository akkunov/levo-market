'use client'

import {FormEvent, useState} from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Spinner from "@/app/components/ui/Spinner";

export default function LoginPage() {
    const supabase = createClientComponentClient()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleLogin(e: FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        router.push('/admin')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-white mb-6">Вход в систему</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Пароль"
                        required
                        className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    {error && (
                        <div className="text-red-400 text-sm bg-red-900/40 border border-red-700 rounded-lg p-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50 flex items-center justify-center"
                    >
                        {loading ? <Spinner /> : 'Войти'}
                    </button>
                </form>

                <button
                    onClick={() => router.push('/')}
                    className="mt-6 w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition"
                >
                    На главную
                </button>
            </div>
        </div>
    )
}
