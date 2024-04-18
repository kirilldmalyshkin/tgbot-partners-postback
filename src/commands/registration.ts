import { Context, Markup } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:registration_command');

export const registration = () => async (ctx: Context) => {
  debug(`Triggered ${registration.name} command`);

  const userId = `${ctx.from?.id}`;
  const message = `▶️После успешной регистрации вам от бота придет оповещение о успешной регистрации\n\nПосле чего можно будет пользоваться сигналами\\!▶️`;

  const imageUrl =
    'https://qph.cf2.quoracdn.net/main-qimg-5173ad60704a342b3516fb3a6f4cf6b8';

  const inlineKeyboard = Markup.inlineKeyboard([
    [
      Markup.button.url(
        '🔗Регистрация',
        `https://vs66cd75semb.com/VNos$sub1=${userId}`,
      ),
    ],
    [Markup.button.callback('🏠Главное меню', 'start')],
  ]);

  await ctx.replyWithPhoto(imageUrl, {
    caption: message,
    parse_mode: 'MarkdownV2',
    ...inlineKeyboard,
  });
};
