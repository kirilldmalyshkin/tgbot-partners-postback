import { createClient } from '@vercel/kv';

const client = createClient({
    url: String(process.env.USERS_REST_API_URL),
    token: String(process.env.USERS_REST_API_TOKEN),
});

export const kvService = {
    async save(key: string, field: string, value: string) {
        await client.hset(key, { [field]: value });
    },
    async get(key: string, field: string): Promise<string | null> {
        return await client.hget(key, field);
    }
};

