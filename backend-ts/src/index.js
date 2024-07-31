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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
const redis_1 = require("redis");
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
const redisClient = (0, redis_1.createClient)();
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, sqlite_1.open)({
        filename: './db/database.sqlite',
        driver: sqlite3_1.default.Database
    });
    yield db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    )`);
    app.use(express_1.default.json());
    app.use('/users', (0, userRoutes_1.default)(db, redisClient));
    app.listen(PORT, () => {
        console.log('Server is running');
    });
}))();
