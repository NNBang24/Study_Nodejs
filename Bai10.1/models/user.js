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
            allowNull: false,
            validate: {
                len: [5, 20]  // bắt buộc từ 5 đến 20 ký tự
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true  // bắt buộc phải đúng định dạng email
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 100]  // mật khẩu từ 6 ký tự trở lên
            }
        },
        avatar : {
            type: DataTypes.STRING,
        },
        role : {
            type : DataTypes.ENUM('user' , 'admin') ,
             allowNull : false ,
             defaultValue : 'user'
        }
       

    },
        {
            sequelize,
            modelName: 'User',
            tableName: 'Users',
            timestamps: true, // tu dong them 2 cot createdAt va updatedAt
            defaultScope : {
                attributes : {
                    exclude : ['password']
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