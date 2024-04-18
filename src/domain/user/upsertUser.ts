import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function upsertUser(
  externalId: string,
  tgId: string,
): Promise<User> {
  return prisma.user.upsert({
    where: { tgId },
    update: { externalId },
    create: { tgId, externalId },
  });
}
