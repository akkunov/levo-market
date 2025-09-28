import Image from "next/image"
import { prisma } from "@/lib/prisma"
import Container from "@/app/components/container/Container"
import WashMachine from "@/app/components/cards/washMachine/WashMachine"

type Props = {
    params: { id: string }
}

export default async function ProductDetailPage({ params }: Props) {
    const product = await prisma.product.findUnique({
        where: { id: params.id },
        include: { category: true },
    })

    if (!product) {
        return <div className="p-10">Товар не найден</div>
    }

    // похожие товары из той же категории
    const related = await prisma.product.findMany({
        where: { categoryId: product.categoryId, NOT: { id: product.id } },
        take: 4,
    })

    return (
        <Container className="mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Фото */}
                <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
                    <Image
                        src={product.photoUrl || "/placeholder.png"}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="object-contain max-h-[500px]"
                    />
                </div>

                {/* Инфо */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-600">{product.type}</p>
                    <div className="text-2xl font-bold text-blue-600">
                        {product.price} сом
                    </div>
                    <button className="bg-[#003F62] text-white px-6 py-3 rounded hover:bg-[#002b44] transition w-fit">
                        Купить
                    </button>

                    {/* Характеристики */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Характеристики</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Категория: {product.category?.name}</li>
                            <li>Тип: {product.type}</li>
                            {/* сюда можно добавить поля из БД */}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Описание */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-2">Описание</h2>
            </div>

            {/* Похожие товары */}
            {related.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Похожие товары</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {related.map(r => (
                            <WashMachine
                                key={r.id}
                                image={r.photoUrl || "/placeholder.png"}
                                name={r.name}
                                alt={r.name}
                                price={r.price}
                                id={r.id}
                                category={r.categoryId || null}
                            />
                        ))}
                    </div>
                </div>
            )}
        </Container>
    )
}
