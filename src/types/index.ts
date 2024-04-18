// types.ts
import { Context } from 'telegraf';

export interface MySession {
    language?: string;
}

export interface MyContext extends Context {
    session: MySession;
}