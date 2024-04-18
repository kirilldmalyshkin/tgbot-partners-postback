import { Markup } from 'telegraf';
import createDebug from 'debug';
import { loadLanguage } from "../domain";
import {ContentStructure} from "../data/interface";
import {MyContext} from "../types";
// import content from '../data/content.json';
const content: ContentStructure = require('../data/content.json');

// const content = globalContent.;

const debug = createDebug('bot:greeting_text');

export const greeting = () => async (ctx: MyContext) => {
  debug(`Triggered ${greeting.name} text command`);

  const language = await loadLanguage(ctx);
  const greetingContent = content[language]?.greeting;
  // const text = content[language]['greetingMessage'];
  const userName = ctx.from?.first_name + ' ' + (ctx.from?.last_name || '');
  const userId = `${ctx.from?.id}`;
  // const welcomeMessage = content.text;
  const message = greetingContent.text.replace('{name}', userName).replace('{id}', String(userId));
  // const welcomeMessage = `Привет ${userName} \n\nДобро пожаловать в 💀 *ALEXEY BOT* 💀\n\nтвой ID — *${userId}*`;

  const inlineKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('📝Регистрация', 'registration')],
    [Markup.button.callback('📚Инструкция', 'instructions')],
    // Markup.button.callback('🏠Главное меню', 'start')]
  ]);

  const imageUrl =
    'https://avatars.mds.yandex.net/get-mpic/12390131/2a0000018e3d75be2247d25fa833bb461ab9/600x800';

  await ctx.replyWithPhoto(imageUrl, {
    caption: message,
    parse_mode: 'MarkdownV2',
    ...inlineKeyboard,
  });
};
