import { Telegraf } from 'telegraf';
import { VercelRequest, VercelResponse } from '@vercel/node';

import { development, production } from './core';
import {greeting, instructions, language, registration} from './commands';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);

bot.start(language());
// bot.start(greeting());
bot.command('instructions', instructions());
bot.command('registration', registration());
bot.command('main', greeting());

bot.action('instructions', (ctx) => instructions()(ctx));
bot.action('registration', (ctx) => registration()(ctx));
bot.action('main', (ctx) => greeting()(ctx));

bot.telegram.setMyCommands([
  { command: 'main', description: 'Начать работу с ботом' },
  { command: 'instructions', description: 'Инструкция как пользоваться' },
  { command: 'registration', description: 'Регистрация' },
]);

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
