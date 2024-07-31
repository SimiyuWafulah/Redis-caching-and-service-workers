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
exports.getUsers = exports.createUser = void 0;
const createUser = (db, name, email) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
});
exports.createUser = createUser;
const getUsers = (db) => __awaiter(void 0, void 0, void 0, function* () {
    return db.all('SELECT * FROM users');
});
exports.getUsers = getUsers;
