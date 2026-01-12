'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {

        }

    }
    User.init({
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        


    },
        {
            sequelize,
            modelName: 'User',
            tableName: 'Users',
            timestamps: false, // tu dong them 2 cot createdAt va updatedAt
            // gioi han 
            defaultScope: {
                attributes: {
                    exclude: ['password']
                },

            },
            scopes: {
                withPassword: {
                    attributes: {},
                }
            }
        }

    )
    return User;
}