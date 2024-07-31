import { RedisClientType } from 'redis';

export const getCachedData = async (redisClient: RedisClientType, key: string): Promise<string | null> => {
    return await redisClient.get(key);
};

export const setCachedData = async (redisClient: RedisClientType, key: string, value: string, expiration: number): Promise<void> => {
    await redisClient.set(key, value, { EX: expiration });
};
