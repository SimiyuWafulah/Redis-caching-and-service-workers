import Sequelize from 'sequelize';
import { development as config } from '../config.json';

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
