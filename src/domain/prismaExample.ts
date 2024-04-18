
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async function prismaExample(name: string | string[]): Promise<any>{
    await prisma.user.create({
        data: {
            name,
            tgId: 'xxxx@example-user.com',
        },
    });
    return prisma.user.findFirst();
}