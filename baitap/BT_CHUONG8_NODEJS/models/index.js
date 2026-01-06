'use strict';
require('dotenv').config();
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development'

const config = require(__dirname + '/../config/config.js')[env];
const db = {};
if (!config) {
    throw new Error(`Không tìm thấy cấu hình cho môi trường: ${env}`);
}
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Post = require('./post')(sequelize, Sequelize.DataTypes);


Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db