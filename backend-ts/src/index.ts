import express from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { createClient} from 'redis';
import userRoutes from './routes/userRoutes';
import redis from 'redis'

const app = express();
const PORT = 3000;

const redisClient = createClient() as redis.RedisClientType;
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

(async () => {
    const db = await open({
        filename: './src/db/database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    )`);

    app.use(express.json());
    app.use('/users', userRoutes(db, redisClient));

    app.listen(PORT, () => {
        console.log('Server is running');
    });
})();
