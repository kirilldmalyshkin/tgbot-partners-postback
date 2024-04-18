import { Context, Markup } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:start_command');

export const language = () => async (ctx: Context) => {
    debug(`Triggered start command`);

    const languageSelection = Markup.inlineKeyboard([
        Markup.button.callback('🇷🇺 Русский', 'set_language_ru'),
        Markup.button.callback('🇬🇧 English', 'set_language_en')
    ]);

    await ctx.reply('Выберите язык / Choose a language:', languageSelection);
};
