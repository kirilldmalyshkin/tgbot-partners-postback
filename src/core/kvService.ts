import { createClient } from '@vercel/kv';

const client = createClient({
  url: String(process.env.KV_REST_API_URL),
  token: String(process.env.KV_REST_API_TOKEN),
});

export const kvService = {
  async save(key: string, field: string, value: string) {
    try {
      await client.hset(key, { [field]: value });
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  },
  async get(key: string, field: string): Promise<string | null> {
    try {
      return await client.hget(key, field);
    } catch (error) {
      console.error('Ошибка при получении:', error);
      return null;
    }
  },
};
