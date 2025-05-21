import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const User = db.define('users', {
    author: DataTypes.STRING,
    about: DataTypes.STRING,
    note: DataTypes.STRING
}, {
    freezeTableName: true
});

export default User;

(async()=>{
    await db.sync();
})();
