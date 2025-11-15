'use strict'
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {

            // quan he co nhieu
            Category.hasMany(models.Product, {
                foreignKey: 'categoryId', // ten khoa ngoai
                as : 'products' // alias de truy van quan he
            });

        }

    }
    Category.init({
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        description: DataTypes.TEXT,
    },
        {
            sequelize,
            modelName: 'Category',
            tableName: 'Categories',
            timestamps: true // tu dong them 2 cot createdAt va updatedAt
        }

    )
    return Category;
}