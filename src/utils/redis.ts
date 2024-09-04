import { createClient, RedisClientType } from "redis";

class RedisClient {
  private client: RedisClientType;

  constructor() {
    this.client = createClient();
    this.client.on("error", (error) => {
      console.error(`Redis client error: ${error}`);
    });
  }

  isAlive(): boolean {
    return this.client.isOpen;
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, duration: number): Promise<void> {
    await this.client.set(key, value, {
      EX: duration,
    });
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
