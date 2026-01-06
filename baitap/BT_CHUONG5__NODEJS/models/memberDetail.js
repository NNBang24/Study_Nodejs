'use strict' ;

const {Model, DataTypes} = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize , DataTypes) => {
    class MemberDetal extends Model {
        static associate(models) {
            MemberDetal.belongsTo(models.Member, {
                foreignKey : 'memberId' ,
                as : 'member'
            })
        }
    }
    MemberDetal.init (
        {
            firstName : DataTypes.STRING ,
            lastName : DataTypes.STRING ,
            phone : DataTypes.STRING ,
            memberId :{
                type : DataTypes.INTEGER ,
                unique : true ,
                allowNull : false 
            }
        },
        {
            sequelize ,
            modelName : 'MemberDetail' ,
            tableName : 'MemberDetails',
            timestamps : true 
        }
    )
    return MemberDetal ;
}