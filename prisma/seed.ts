import { PrismaClient } from '../app/generated/prisma';
const prisma = new PrismaClient()

async function main() {
    await prisma.user.createMany({
        data: [
            { email: 'alice@example.com', name: 'Alice' },
            { email: 'bob@example.com', name: 'Bob' },
            { email: 'carol@example.com' }, // без имени
        ],
    })
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect())