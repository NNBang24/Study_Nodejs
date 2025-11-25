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
        email:{
            type : DataTypes.STRING ,
            unique : true ,
            allowNull : false 
        } ,
        avatar : {
            type : DataTypes.STRING
        },
        password : {
            type : DataTypes.STRING ,
            allowNull : false  
        },
        // role la vai tro cua nguoi do 
        role : {
            type : DataTypes.ENUM('user' ,'admin') ,    
            allowNull: false ,
            defaultValue : 'user'
        }
       

    },
        {
            sequelize,
            modelName: 'User',
            tableName: 'Users',
            timestamps: true, // tu dong them 2 cot createdAt va updatedAt
            // gioi han 
            defaultScope : {
                attributes : {
                    exclude :['password']
                },

            },
            scopes : {
                withPassword : {
                    attributes : {} ,
                }
            }
        }

    )
    return User;
}