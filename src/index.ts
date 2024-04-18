import { Telegraf } from 'telegraf';
import { VercelRequest, VercelResponse } from '@vercel/node';

import { development, production } from './core';
import { greeting, instructions, registration } from './commands';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);

bot.start(greeting());
bot.command('instructions', instructions());
bot.command('registration', registration());

bot.action('instructions', (ctx) => instructions()(ctx));
bot.action('registration', (ctx) => registration()(ctx));
bot.action('start', (ctx) => greeting()(ctx));

bot.telegram.setMyCommands([
  { command: 'start', description: 'Начать работу с ботом' },
  { command: 'instructions', description: 'Инструкция как пользоваться' },
  { command: 'registration', description: 'Регистрация' },
]);

export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};

ENVIRONMENT !== 'production' && development(bot);

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});
