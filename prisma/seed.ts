import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()

    const cat1 = await prisma.category.create({ data: { name: 'Стиральные машины', slug: 'stiralnye-mashiny' } })
    const cat2 = await prisma.category.create({ data: { name: 'Холодильники', slug: 'holodilniki' } })

    await prisma.product.createMany({
        data: [
            { name: 'WashPro 300', price: 499.99, type: 'Стиральная машина', categoryId: cat1.id },
            { name: 'CoolFridge X', price: 899.5, type: 'Холодильник', categoryId: cat2.id },
        ],
    })

    console.log('Seed complete')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
