'use strict' ;

const {Model} = require('sequelize');


module.exports = (sequelize  , DataTypes) => {
    class Task extends Model {
        static associate (models) {

        }
    }
    Task.init (
        {
            title : {
                type : DataTypes.STRING  ,
                allowNull : false ,
                validate : {
                    len : [3 , 255]
                }
            },
            description : {
                type : DataTypes.TEXT ,
                allowNull : true 
            },
            isCompleted : {
                type : DataTypes.BOOLEAN ,
                allowNull : false ,
                defaultValue: false
            },
            dueDate : {
                type: DataTypes.DATEONLY ,
                allowNull :true
            }

        },
        {
            sequelize ,
            modelName : 'Task' ,
            tableName : 'Tasks' ,
            timestamps : true 
        }
    )
    return Task ;
}