import { Sequelize } from "sequelize";

const db = new Sequelize('notes', 'root', '123220024', {
    host: '34.121.20.199',
    dialect: 'mysql',
});

export default db;