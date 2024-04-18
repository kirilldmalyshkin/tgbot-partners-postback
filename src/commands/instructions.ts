import { Markup } from 'telegraf';
import createDebug from 'debug';
import { MyContext } from '../types';

const debug = createDebug('bot:instructions_command');

export const instructions = () => async (ctx: MyContext) => {
  debug(`Triggered ${instructions.name} command`);
  const message = ctx.i18n.t('instructions.text');

  const inlineKeyboard = Markup.inlineKeyboard([
    Markup.button.callback(ctx.i18n.t('markup.main.text'), 'main'),
  ]);

  await ctx.reply(message, { parse_mode: 'Markdown', ...inlineKeyboard });
};
