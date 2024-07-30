import express from 'express'
import redis from 'redis';
import { sequelize, Sequelize } from './models';

const app = express ();
const PORT = 3000

const client = redis.createClient();

client.on('error', (err) => {
    console.log('Redis error:', err);
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

//sample endpoint test 
app.get('/users', async (req, res) => {
    const cacheKey = 'users';
    client.get(cacheKey, async (err, data) => {
        if (err) throw err;

        if (data) {
            res.send(JSON.parse(data));
        } else {
            const users = await sequelize.query('SELECT * FROM users', { type: Sequelize.QueryTypes.SELECT });
            client.setEx(cacheKey, 3600, JSON.stringify(users));
            res.send(users);
        }
    });
});


app.listen(PORT, () => {
    console.log('Server is running')
});
