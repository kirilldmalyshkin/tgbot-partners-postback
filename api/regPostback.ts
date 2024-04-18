import { VercelRequest, VercelResponse } from '@vercel/node';
import { upsertUser } from "../src/domain";
import { bot } from '../src';

export default async function handle(req: VercelRequest, res: VercelResponse) {
    try {
        const { sub1, source } = req.query;
        const user = await upsertUser(String(source), String(sub1));
        if (user) {
            res.statusCode = 200;
            res.send(`Ok`);
            await bot.telegram.sendMessage(user.tgId, "Ваша регистрация успешно обновлена!");
        } else {
            res.statusCode = 400;
            res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
        }
    } catch (e: any) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
        console.error(e.message);
    }
}