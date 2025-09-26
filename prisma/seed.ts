import {PrismaClient} from "@/app/generated/prisma";


const prisma = new PrismaClient()

async function main() {
    await prisma.user.createMany({
        data: [
            { email: 'asan@asfsafas.com', name: 'Bob' },
            { email: 'asan@asfsafaasfasfs.com', name: 'Bob' },
            { email: 'asan@asfsaasffasfaasfasfs.com', name: 'Bob' },
            { email: 'asan@asfas.com', name: 'Bob' },
        ],
    })
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect())