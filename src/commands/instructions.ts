import { Context, Markup } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:instructions_command');

export const instructions = () => async (ctx: Context) => {
  debug(`Triggered ${instructions.name} command`);
  const message = `Привет! Это информация о боте 💀ALEXEY BOT 💀.`;

  const inlineKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('🏠Главное меню', 'start'),
  ]);

  await ctx.reply(message, { parse_mode: 'Markdown', ...inlineKeyboard });
};
