"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
const userRoutes = (db, redisClient) => {
    router.get('/', async (req, res) => {
        const cacheKey = 'users';
        try {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                res.json(JSON.parse(cachedData));
            }
            else {
                const users = await (0, user_1.getUsers)(db);
                await redisClient.set(cacheKey, JSON.stringify(users), { EX: 3600 });
                res.json(users);
            }
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    });
    router.post('/', async (req, res) => {
        const { name, email } = req.body;
        try {
            await (0, user_1.createUser)(db, name, email);
            await redisClient.del('users');
            res.status(201).send('User created');
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    });
    return router;
};
exports.default = userRoutes;
