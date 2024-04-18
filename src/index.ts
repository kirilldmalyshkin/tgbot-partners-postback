import { Telegraf, session  } from 'telegraf';
// import { Memory } from '@telegraf/session';
import { VercelRequest, VercelResponse } from '@vercel/node';
// import { session } from '@telegraf/session';

import { development, production } from './core';
import { greeting, instructions, language, registration } from './commands';
import {setUserLanguage} from './domain';
import {MyContext} from "./types";

const BOT_TOKEN = String(process.env.BOT_TOKEN || '');
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf<MyContext>(BOT_TOKEN);

bot.use(session());

bot.start(language());
// bot.start(greeting());
bot.command('instructions', instructions());
bot.command('registration', registration());

bot.command('main', greeting());
bot.action('instructions', (ctx) => instructions()(ctx));
bot.action('registration', (ctx) => registration()(ctx));

bot.action('main', (ctx) => greeting()(ctx));
// bot.action('set_language_ru', (ctx) => setUserLanguage(ctx, 'ru'));
// bot.action('set_language_en', (ctx) => setUserLanguage(ctx, 'en'));

bot.action(/set_language_(.*)/, async (ctx) => {
  const selectedLanguage = ctx.match[1];
  if (!ctx.session) {
    ctx.session = {};
  }
  ctx.session.language = selectedLanguage;  // Установка языка
  await setUserLanguage(ctx, selectedLanguage);
  ctx.reply(`Language set to ${selectedLanguage}`);
  greeting()(ctx);
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
