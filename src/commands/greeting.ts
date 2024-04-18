import { Markup } from 'telegraf';
import createDebug from 'debug';
import { MyContext } from '../types';

const debug = createDebug('bot:greeting_text');

export const greeting = () => async (ctx: MyContext) => {
  debug(`Triggered ${greeting.name} text command`);
  const message = ctx.i18n.t('greeting.text');

  const inlineKeyboard = Markup.inlineKeyboard([
    [
      Markup.button.callback(
        ctx.i18n.t('markup.registration.text'),
        'registration',
      ),
    ],
    [
      Markup.button.callback(
        ctx.i18n.t('markup.instructions.text'),
        'instructions',
      ),
    ],
  ]);

  await ctx.replyWithPhoto(ctx.i18n.t('greeting.imageUrl'), {
    caption: message,
    parse_mode: 'MarkdownV2',
    ...inlineKeyboard,
  });
};
