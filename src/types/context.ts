import { Context } from 'telegraf';
import I18n from 'telegraf-i18n';

export interface MySession {
  language?: string;
}

export interface MyContext extends Context {
  session: MySession;
  i18n: I18n;
}
