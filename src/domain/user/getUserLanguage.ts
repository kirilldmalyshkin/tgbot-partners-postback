import { LangContent, MyContext } from '../../types';
import { PrismaClient } from '@prisma/client';
import { kvService } from '../../core';

const prisma = new PrismaClient();

export async function getUserLanguage(ctx: MyContext): Promise<string> {
  const tgId = String(ctx.from?.id);

  if (ctx.session?.language && isLang(ctx.session.language)) {
    return ctx.session.language;
  }

  const languageFromKV = await kvService.get('userLanguage', tgId);
  if (languageFromKV && isLang(languageFromKV)) {
    return languageFromKV;
  }

  const user = await prisma.user.findUnique({
    where: { tgId: tgId },
  });
  if (user && user.locale && isLang(user.locale)) {
    return user.locale;
  }

  return 'ru';
}

function isLang(value: any): value is LangContent {
  return value === 'en' || value === 'ru';
}
