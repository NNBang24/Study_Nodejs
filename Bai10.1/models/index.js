// ket noi voi mysql 
'use strict' ;

const Sequelize  = require('sequelize') ;
const env = process.env.NODE_ENV || 'development' ;
const config = require(__dirname + '/../config/config.js')[env];
const db ={};


// thuc hien ket noi voi mysql
const sequelize = new Sequelize(config.database , config.username , config.password , config);

db.Category = require('./category')(sequelize, Sequelize.DataTypes);
db.Tag = require('./tag')(sequelize, Sequelize.DataTypes);
db.ProductTag = require('./productTag')(sequelize, Sequelize.DataTypes);
db.Product = require('./product')(sequelize, Sequelize.DataTypes);
db.Profile = require('./profile')(sequelize, Sequelize.DataTypes);
db.User = require('./user')(sequelize, Sequelize.DataTypes);


Object.keys(db).forEach(modelName => {
    if(db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize =  sequelize ;
db.Sequelize = Sequelize ;

module.exports = db;
