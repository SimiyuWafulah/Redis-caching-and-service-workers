"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCachedData = exports.getCachedData = void 0;
const getCachedData = async (redisClient, key) => {
    return await redisClient.get(key);
};
exports.getCachedData = getCachedData;
const setCachedData = async (redisClient, key, value, expiration) => {
    await redisClient.set(key, value, { EX: expiration });
};
exports.setCachedData = setCachedData;
