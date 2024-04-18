import { VercelRequest, VercelResponse } from '@vercel/node';
import prismaExample from "../src/domain/prismaExample";

export default async function handle(req: VercelRequest, res: VercelResponse) {
    try {
        const { name = 'World' } = req.query;
        const a = await prismaExample(name);
        res.send(`Hello ${a}!`);
    } catch (e: any) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
        console.error(e.message);
    }
}