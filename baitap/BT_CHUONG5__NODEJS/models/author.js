'use strict';
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
    class Author extends Model {
        static associate(models) {
            // moi qun he 1  nhieu , va 1 tac gia co nhieu sach

            Author.hasMany(models.Book, {
                foreignKey: 'authorId',
                as: 'books'
            })
        }
    }
    Author.init(
        {
            name :{
                type :  DataTypes.STRING ,
                allowNull : false
            },
            bio : DataTypes.TEXT 

        },
        {
            sequelize ,
            modelName : 'Author',
            tableName : 'Authors',
            timestamps : true 
        }
    )
    return Author ;
}
