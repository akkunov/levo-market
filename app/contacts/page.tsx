'use client'
import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Building2 } from "lucide-react";
import {YMAP_MAP_KEY} from "@/lib/config";

interface Contact {
    city: string;
    address: string;
    phones: string[];
    coords: [number, number];
}

const contacts: Contact[] = [
    {
        city: "Бишкек",
        address: "ул. Осмонкула 186",
        phones: ["0505896306", "0555896306"],
        coords: [42.887689, 74.628171],
    },
    {
        city: "Г.Кара балта-Г.Каракол-Г.Нарын-Г.Токмок-Г.Балыкчы-Г.Талас",
        address: "ул. Осмонкула 186",
        phones: ["0505896306", "0555896306"],
        coords: [42.887689, 74.628171],
    },
    {
        city: "Ош",
        address: "ул. Аскар Шакиров 161",
        phones: ["0550005153", "996322241515"],
        coords: [40.522234, 72.810592],
    },
    {
        city: "Джалал Абад",
        address: "ул. Малашов 19 (по ремонту белой техники)",
        phones: ["0999547443", "0704737220"],
        coords: [41.152260, 73.309929],
    },
    {
        city: "Узген",
        address: "ул. Бегалдиев 1",
        phones: ["0557778100"],
        coords: [40.7694, 73.3],
    },
    {
        city: "Кызыл-Кыя",
        address: "с. Уч Коргон, Мамасиваев 2",
        phones: ["0773200892", "0774786000"],
        coords: [40.25, 72.1167],
    },
    {
        city: "Араван",
        address: "ул. Хабиб Абдуллаева 74/1",
        phones: ["0557258783", "0556890028"],
        coords: [40.506843, 72.504491],
    },
    {
        city: "Ноокат",
        address: "ул. Ошская 71",
        phones: ["0554201636", "0551955516"],
        coords: [40.2667, 72.6167],
    },
    {
        city: "Баткен",
        address: "ул. Илимбек Мурзаев №2",
        phones: ["0776250091"],
        coords: [40.060518, 70.819638],
    },
    {
        city: "Базар-Кургон",
        address: "Ориентир школа Бокомбаева",
        phones: ["0551066560"],
        coords: [41.068678, 72.644019],
    },
    {
        city: "Таш-Көмүр",
        address: "ул. Какелеев 17/4",
        phones: ["0998191009", "0777565756"],
        coords: [41.346660, 72.225806],
    },
];

export default function ContactsPage() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const [selectedCity, setSelectedCity] = useState<string>("Все");

    const filteredContacts =
        selectedCity === "Все"
            ? contacts
            : contacts.filter((c) => c.city === selectedCity);

    // Инициализация Яндекс. Карты
    useEffect(() => {
        const loadMap = async () => {
            if (window?.ymaps) return initMap();

            const script = document.createElement("script");
            script.src =
                `https://api-maps.yandex.ru/2.1/?apikey=${YMAP_MAP_KEY}&lang=ru_RU`;
            script.async = true;
            script.onload = initMap;
            document.body.appendChild(script);
        };

        const initMap = () => {
            // @ts-ignore
            window.ymaps.ready(() => {
                if (!mapRef.current) return;

                // @ts-ignore
                const ymaps = window.ymaps;
                mapInstance.current = new ymaps.Map(mapRef.current, {
                    center: [40.7, 72.8],
                    zoom: 8,
                    controls: ["zoomControl"],
                });

                renderMarkers(filteredContacts);
            });
        };

        loadMap();
    }, []);

    // Перерисовка точек при смене фильтра
    useEffect(() => {
        if (!window?.ymaps || !mapInstance.current) return;
        renderMarkers(filteredContacts);

        if (selectedCity !== "Все") {
            const found = contacts.find((c) => c.city === selectedCity);
            if (found) mapInstance.current.setCenter(found.coords, 11);
        } else {
            mapInstance.current.setCenter([40.7, 72.8], 8);
        }
    }, [selectedCity]);

    // Функция добавления меток
    const renderMarkers = (list: Contact[]) => {
        // @ts-ignore
        const ymaps = window.ymaps;
        mapInstance.current.geoObjects.removeAll();

        list.forEach((c) => {
            // @ts-ignore
            const placemark = new ymaps.Placemark(c.coords, {
                balloonContent: `<b>${c.city}</b><br/>${c.address}`,
            });
            mapInstance.current.geoObjects.add(placemark);
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Заголовок */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Контакты сервисных центров
                    </h1>
                    <p className="text-gray-500">
                        Найдите ближайший сервисный центр и свяжитесь напрямую
                    </p>
                </div>

                {/* Фильтр */}
                <div className="flex justify-center">
                    <Select
                        value={selectedCity}
                        onValueChange={(val) => setSelectedCity(val)}
                    >
                        <SelectTrigger className="w-60">
                            <SelectValue placeholder="Выберите город" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Все">Все города</SelectItem>
                            {contacts.map((c, i) => (
                                <SelectItem key={i} value={c.city}>
                                    {c.city}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Карта */}
                <div
                    ref={mapRef}
                    className="w-full h-[400px] rounded-2xl overflow-hidden shadow"
                />

                {/* Карточки */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContacts.map((contact, index) => (
                        <Card
                            key={index}
                            className="shadow-sm hover:shadow-lg transition border border-gray-200 rounded-2xl cursor-pointer"
                            onClick={() => {
                                setSelectedCity(contact.city);
                                if (mapInstance.current) {
                                    mapInstance.current.setCenter(contact.coords, 12);
                                }
                            }}
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                                    <Building2 className="text-blue-600" size={20} />
                                    {contact.city}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-600 space-y-3">
                                <div className="flex items-start gap-2">
                                    <MapPin size={18} className="mt-0.5 text-gray-400" />
                                    <p>{contact.address}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    {contact.phones.map((phone, i) => (
                                        <a
                                            key={i}
                                            href={`tel:${phone}`}
                                            className="flex items-center gap-2 text-blue-600 hover:underline"
                                        >
                                            <Phone size={16} />
                                            {phone}
                                        </a>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
