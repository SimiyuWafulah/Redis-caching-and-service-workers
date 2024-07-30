import { Sequelize } from 'sequelize';
const config = require('../config.json').development;

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect
    }
);

export { sequelize, Sequelize };
