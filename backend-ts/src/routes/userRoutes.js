"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
const userRoutes = (db, redisClient) => {
    router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const cacheKey = 'users';
        try {
            const cachedData = yield redisClient.get(cacheKey);
            if (cachedData) {
                res.json(JSON.parse(cachedData));
            }
            else {
                const users = yield (0, user_1.getUsers)(db);
                yield redisClient.set(cacheKey, JSON.stringify(users), { EX: 3600 });
                res.json(users);
            }
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }));
    router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email } = req.body;
        try {
            yield (0, user_1.createUser)(db, name, email);
            yield redisClient.del('users');
            res.status(201).send('User created');
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }));
    return router;
};
exports.default = userRoutes;
