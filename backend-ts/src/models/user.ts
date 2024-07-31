import { Database } from 'sqlite';

export interface User {
    id: number;
    name: string;
    email: string;
}

export const createUser = async (db: Database, name: string, email: string): Promise<void> => {
    await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
};

export const getUsers = async (db: Database): Promise<User[]> => {
    return db.all('SELECT * FROM users');
};
