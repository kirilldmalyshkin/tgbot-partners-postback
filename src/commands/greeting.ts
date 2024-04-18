import { Context, Markup } from 'telegraf';
import createDebug from 'debug';
// import globalContent from '../data/content.json';

// const content = globalContent.greeting;

const debug = createDebug('bot:greeting_text');

export const greeting = () => async (ctx: Context) => {
  debug(`Triggered ${greeting.name} text command`);

  const userName = ctx.from?.first_name + ' ' + (ctx.from?.last_name || '');
  const userId = `${ctx.from?.id}`;
  // const welcomeMessage = content.text;
  const welcomeMessage = `Привет ${userName} \n\nДобро пожаловать в 💀 *ALEXEY BOT* 💀\n\nтвой ID — *${userId}*`;

  const inlineKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('📝Регистрация', 'registration')],
    [Markup.button.callback('📚Инструкция', 'instructions')],
    // Markup.button.callback('🏠Главное меню', 'start')]
  ]);

  const imageUrl =
    'https://avatars.mds.yandex.net/get-mpic/12390131/2a0000018e3d75be2247d25fa833bb461ab9/600x800';

  await ctx.replyWithPhoto(imageUrl, {
    caption: welcomeMessage,
    parse_mode: 'MarkdownV2',
    ...inlineKeyboard,
  });
};
