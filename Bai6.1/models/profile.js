'use strict'
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
        static associate(models) {
            Profile.belongsTo(models.User,{
                foreignKey : 'userId',// ten khoa ngoaij trong bang user
                as : 'user' // alias de truy an quan he 
            })
        }

    }
    Profile.init({
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        bio : DataTypes.TEXT ,
        userId : {
            type : DataTypes.INTEGER ,
            unique : true ,

        }
    },
        {
            sequelize,
            modelName: 'Profile',
            tableName: 'Profiles',
            timestamps: true // tu dong them 2 cot createdAt va updatedAt
        }

    )
    return Profile;
}