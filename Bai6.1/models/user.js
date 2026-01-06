'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Profile ,{
                foreignKey : 'userId',
                as : 'profile'
            })
        }

    }
    User.init({
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: DataTypes.STRING
       

    },
        {
            sequelize,
            modelName: 'User',
            tableName: 'Users',
            timestamps: true // tu dong them 2 cot createdAt va updatedAt
        }

    )
    return User;
}