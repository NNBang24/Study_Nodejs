// ket noi  voi database MYSQL 
'use strict' ;

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development' ;

const config = require(__dirname + '/../config/config.js')[env] 

const db ={} ;

// thuc hien ket noi voi mySql
const sequelize = new Sequelize(config.database , config.username , config.password , config) ;
db.Book = require('./book') (sequelize,Sequelize);
db.Author = require('./author') (sequelize,Sequelize);
db.BookGenre = require('./bookGenre')(sequelize,Sequelize)
db.Genre = require('./genre') (sequelize,Sequelize);
Object.keys(db).forEach(modelName => {
    if(db[modelName].associate) {
        db[modelName].associate(db);
    }
})

db.sequelize = sequelize ;
db.Sequelize = Sequelize ;

module.exports = db ;