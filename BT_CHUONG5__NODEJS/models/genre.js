'use strict';
const{ Model, DataTypes}  = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize , DataTypes) => {
    class Genre extends Model {
        static associate(models) {
            Genre.belongsToMany(models.Book , {
                through : models.BookGenre ,
                foreignKey : 'genreId' ,
                otherKey : 'bookId' ,
                as : 'books'
            })
        }
    }
    Genre.init(
        {
            name : {
                type : DataTypes.STRING,
                unique : true ,
                allowNull : false 
            },
            description : DataTypes.TEXT 

        },
        {
            sequelize ,
            modelName : 'Genre' ,
            tableName : 'Genres' ,
            timestamps : true 
        }
    )
    return Genre ;
}