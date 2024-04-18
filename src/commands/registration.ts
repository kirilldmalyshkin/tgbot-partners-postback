import { Markup } from 'telegraf';
import createDebug from 'debug';
import { MyContext } from '../types';

const debug = createDebug('bot:registration_command');

export const registration = () => async (ctx: MyContext) => {
  debug(`Triggered ${registration.name} command`);

  const userId = `${ctx.from?.id}`;

  const inlineKeyboard = Markup.inlineKeyboard([
    [
      Markup.button.url(
        ctx.i18n.t('markup.registration_link.text'),
        ctx.i18n.t('registration.url', { userId }),
      ),
    ],
    [Markup.button.callback(ctx.i18n.t('markup.main.text'), 'main')],
  ]);

  await ctx.replyWithPhoto(ctx.i18n.t('registration.imageUrl'), {
    caption: ctx.i18n.t('registration.text'),
    parse_mode: 'MarkdownV2',
    ...inlineKeyboard,
  });
};
