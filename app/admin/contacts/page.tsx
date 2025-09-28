'use client'
import { useState } from 'react'

export default function ContactsPage() {
    const [contacts, setContacts] = useState({
        instagram: '',
        telegram: '',
        whatsapp: '',
        phone1: '',
        phone2: '',
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setContacts({ ...contacts, [e.target.name]: e.target.value })
    }

    function handleSave() {
        // TODO: отправить на API и сохранить в БД
        console.log('Сохраняем контакты:', contacts)
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Контакты</h1>
            <div className="space-y-3 max-w-md">
                <input
                    name="instagram"
                    value={contacts.instagram}
                    onChange={handleChange}
                    placeholder="Instagram"
                    className="w-full border p-2 rounded"
                />
                <input
                    name="telegram"
                    value={contacts.telegram}
                    onChange={handleChange}
                    placeholder="Telegram"
                    className="w-full border p-2 rounded"
                />
                <input
                    name="whatsapp"
                    value={contacts.whatsapp}
                    onChange={handleChange}
                    placeholder="WhatsApp"
                    className="w-full border p-2 rounded"
                />
                <input
                    name="phone1"
                    value={contacts.phone1}
                    onChange={handleChange}
                    placeholder="Телефон 1"
                    className="w-full border p-2 rounded"
                />
                <input
                    name="phone2"
                    value={contacts.phone2}
                    onChange={handleChange}
                    placeholder="Телефон 2"
                    className="w-full border p-2 rounded"
                />
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Сохранить
                </button>
            </div>
        </div>
    )
}
