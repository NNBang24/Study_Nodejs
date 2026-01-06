'use strict';

const {Model, DataTypes} =  require('sequelize') ;
const { sequelize } = require('.');

module.exports = (sequelize , DataTypes) =>{ 
    class Member extends Model {
        static associatie(models) {
            Member.hasOne(models.MemberDetal , {
                foreignKey : 'memberId',
                as : 'memberDetail'
            })
        }
    }
    Member.init(
        {
            membershipId : {
                type : DataTypes.STRING ,
                unique : true ,
                allowNull : false 
            },
            email : {
                type : DataTypes.STRING ,
                allowNull : false 
            }
        },
        {
            sequelize ,
            modelName : 'Member',
            tableName: 'Members',
            timestamps : true
        }
    )
    return Member ;
} 