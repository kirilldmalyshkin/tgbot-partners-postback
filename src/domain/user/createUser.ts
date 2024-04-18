import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(externalId: string, tgId: string): Promise<any>{
    await prisma.user.create({
        data: {
            externalId,
            tgId,
        },
    });
    return prisma.user.findFirst();
}