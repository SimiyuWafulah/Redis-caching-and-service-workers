import { Router, Request, Response } from 'express';
import { Database } from 'sqlite';
import { createUser, getUsers } from '../models/user';
import { RedisClientType } from 'redis';
import { getCachedData, setCachedData } from '../services/cacheService';

const router = Router();

const userRoutes = (db: Database, redisClient: RedisClientType) => {
    router.get('/', async (req: Request, res: Response) => {
        const cacheKey = 'users';

        try {
            const cachedData = await getCachedData(redisClient, cacheKey);

            if (cachedData) {
                res.json(JSON.parse(cachedData));
            } else {
                const users = await getUsers(db);
                await setCachedData(redisClient, cacheKey, JSON.stringify(users), 3600);
                res.json(users);
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    router.post('/', async (req: Request, res: Response) => {
        const { name, email } = req.body;

        try {
            await createUser(db, name, email);
            await redisClient.del('users');
            res.status(201).send('User created');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    return router;
};

export default userRoutes;
