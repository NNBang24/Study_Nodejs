'use strict';
const { Model, DataTypes } = require('sequelize');
    
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        static associate(models) {
            Book.belongsTo(models.Author, {
                foreignKey: 'authorId',
                as: 'author'
            }),
            Book.belongsToMany(models.Genre, {
                through : models.BookGenre ,
                foreignKey : 'bookId' ,
                otherKey : 'genreId' ,
                as : 'genres'
            })
        }
    }
    Book.init(
        {
            title : {
                type : DataTypes.STRING ,
                allowNull : false 
            },
            isbn : {
                type : DataTypes.STRING ,
                unique : true ,
                allowNull : false 
            },
            publishYear : DataTypes.INTEGER 
        }, 
        {
            sequelize ,
            modelName : 'Book' ,
            tableName : 'Books',
            timestamps : true 
        }
    )
    return Book ;
}