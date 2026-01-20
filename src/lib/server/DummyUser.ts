import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DUMMY_EMAIL = 'dummy@local';

export async function getDummyUser() {
    return prisma.user.upsert({
        where: { email: DUMMY_EMAIL },
        update: {},
        create: { email: DUMMY_EMAIL }
    });
}