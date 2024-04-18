import { Telegraf, session } from 'telegraf';
import { VercelRequest, VercelResponse } from '@vercel/node';

import { attachI18n } from './middlewares';
import { development, production } from './core';
import { greeting, instructions, language, registration } from './commands';
import { setUserLanguage } from './domain';
import { MyContext } from './types';

const BOT_TOKEN = String(process.env.BOT_TOKEN || '');
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf<MyContext>(BOT_TOKEN);

bot.use(session()).use(attachI18n());

bot.start(language());

bot.command('instructions', instructions());
bot.command('registration', registration());
bot.command('main', greeting());

bot.action('instructions', (ctx) => instructions()(ctx));
bot.action('registration', (ctx) => registration()(ctx));
bot.action('main', (ctx) => greeting()(ctx));

bot.action(/set_language_(.*)/, async (ctx) => {
  const selectedLanguage = ctx.match[1];
  if (!ctx.session) {
    ctx.session = {};
  }
  ctx.session.language = selectedLanguage;
  ctx.i18n.locale(selectedLanguage);
  await setUserLanguage(ctx, selectedLanguage);
});

bot.telegram.setMyCommands([
  { command: 'main', description: 'Начать работу с ботом' },
  { command: 'instructions', description: 'Инструкция как пользоваться' },
  { command: 'registration', description: 'Регистрация' },
]);

export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};

ENVIRONMENT !== 'production' && development(bot);

export { bot };
