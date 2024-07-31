"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = void 0;
const createUser = async (db, name, email) => {
    await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
};
exports.createUser = createUser;
const getUsers = async (db) => {
    return db.all('SELECT * FROM users');
};
exports.getUsers = getUsers;
