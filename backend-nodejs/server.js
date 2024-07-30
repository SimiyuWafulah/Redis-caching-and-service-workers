import express from 'express'
import redis from 'redis';

const app = express ();
const PORT = 3000

const client = redis.createClient();

client.on('error', (err) => {
    console.log('Redis error:', err);
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

app.listen(PORT, () => {
    console.log('Server is running')
});