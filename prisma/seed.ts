import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient()

async function main() {
    await prisma.user.createMany({
        data: [
            { email: 'akunov313131@gmail.com', name: 'Bob' },

        ],
    })
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect())