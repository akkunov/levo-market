'use client'

import { ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const menu = [
    { name: 'Продукты', path: '/admin' },
    { name: 'Категории', path: '/admin/categories' },
    { name: 'Контакты', path: '/admin/contacts' },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const supabase = createClientComponentClient()

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <div className="flex min-h-screen bg-[#E7E7E3]">
            {/* Sidebar */}
            <aside className="w-64 bg-[#FAFAFA] text-white flex flex-col">
                <div className="p-4 font-bold text-xl border-b border-gray-700 text-[#232321]">
                    Admin Panel
                </div>
                <nav className="flex-1 p-2 space-y-2">
                    {menu.map(item => (
                        <button
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            className={`block w-full text-left text-[#232321] font-bold px-4 py-2 rounded ${
                                pathname === item.path ? 'bg-[#003F62] text-white' : 'hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>
                <button
                    onClick={handleLogout}
                    className="m-4 py-2 px-4 bg-red-600 hover:bg-red-700 rounded"
                >
                    Выйти
                </button>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    )
}
