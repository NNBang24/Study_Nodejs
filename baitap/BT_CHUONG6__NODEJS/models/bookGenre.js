'use strict' ;
const {Model, DataTypes} = require('sequelize') ;


module.exports = (sequelize ,DataTypes) => {
    class BookGenre extends Model {
        static associate(models){}
    }
    BookGenre.init (
        {

        },
        {
            sequelize ,
            modelName : 'BookGenre' ,
            tableName :'BookGenres',
            timestamps : true 
        }
    )
    return BookGenre ;
}