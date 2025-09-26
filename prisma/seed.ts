import { PrismaClient } from '@/app/generated/prisma';
const prisma = new PrismaClient()

async function main() {
    await prisma.user.createMany({
        data: [
            { email: 'bob@examplsafasfse.com', name: 'Bob' },
            { email: 'bob@exampasfle.com', name: 'Bob' },
        ],
    })
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect())