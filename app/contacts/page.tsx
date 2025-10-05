// app/contacts/page.tsx
"use client";

import React from "react";

const contacts = [
    { id: 1, city: "Ош", address: "ул. Аскар Шакиров 161", phones: ["0550005153", "996322241515"] },
    { id: 2, city: "Джалал Абад", address: "ул. Малашов 19 по ремонту белой техники", phones: ["0999547443", "0704737220"] },
    { id: 3, city: "Узген", address: "ул. Бегалдиев 1", phones: ["0557778100"] },
    { id: 4, city: "Кызыл кыя", address: "с. Уч Коргон, Мамасиваев 2", phones: ["0773200892", "0774786000"] },
    { id: 5, city: "Араван", address: "ул. Хабиб Абдуллаева 74/1", phones: ["0557258783", "0556890028"] },
    { id: 6, city: "Ноокат", address: "ул. Ошская 71", phones: ["0554201636", "0551955516"] },
    { id: 7, city: "Баткен", address: "ул. Илимбек Мурзаев №2", phones: ["0776250091", "0776250091"] },
    { id: 8, city: "Базар Кургон", address: "ориентир школа Бокомбаева", phones: ["0551066560"] },
    { id: 9, city: "Ташкомыр", address: "ул. Какелеев 17/4", phones: ["0998191009", "0777565756"] },
];

export default function ContactsPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Контакты сервисных центров</h1>

            <div className="overflow-x-auto border-none">
                <table className="min-w-full border-collapse mx-auto">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border md:px-4 md:py-2 p-1">№</th>
                        <th className="border md:px-4 md:py-2 p-1">Город</th>
                        <th className="border md:px-4 md:py-2 p-1">Адрес</th>
                        <th className="border md:px-4 md:py-2 p-1">Телефон</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contacts.map((c, i) => (
                        <tr key={c.id} className="hover:bg-gray-50">
                            <td className="border md:px-4 md:py-2 p-1 text-center text-sm md:text-xl">{i + 1}</td>
                            <td className="border md:px-4 md:py-2 p-1  text-sm md:text-xl">{c.city}</td>
                            <td className="border md:px-4 md:py-2 p-1 text-sm md:text-xl">{c.address}</td>
                            <td className="border md:px-4 md:py-2 p-1 text-sm md:text-xl">
                                {c.phones.map((phone, idx) => (
                                    <div key={idx}>
                                        <a href={`tel:${phone}`} className="text-blue-600 hover:underline">
                                            {phone}
                                        </a>
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
