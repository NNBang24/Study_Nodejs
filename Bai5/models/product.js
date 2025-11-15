'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, {
                foreignKey: 'categoryId',
                as: 'categorys'
            });
            Product.belongsToMany(models.Tag, {
                through: models.ProductTag,
                foreignKey: 'productId',
                otherKey: 'tagId',
                as: 'tags'
            })
        }

    }
    Product.init({
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        description: DataTypes.TEXT,
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER
        }

    },
        {
            sequelize,
            modelName: 'Product',
            tableName: 'Products',
            timestamps: true // tu dong them 2 cot createdAt va updatedAt
        }

    )
    return Product;
}