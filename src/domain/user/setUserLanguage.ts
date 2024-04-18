import { PrismaClient } from '@prisma/client';

import { greeting } from '../../commands';
import { kvService } from '../../core';
import { MyContext } from '../../types';

const prisma = new PrismaClient();

export async function setUserLanguage(ctx: MyContext, language: string) {
  const tgId = String(ctx.from?.id);
  const user = await prisma.user.upsert({
    where: { tgId: tgId },
    update: { locale: language },
    create: { tgId: tgId, locale: language },
  });

  await kvService.save('userLanguage', tgId, language);

  await ctx
    .reply(`Язык установлен на: ${language === 'ru' ? 'Русский' : 'English'}`)
    .then(() => {
      greeting()(ctx);
    });
}
