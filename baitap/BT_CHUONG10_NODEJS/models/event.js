'use strict';

const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Event extends Model {
        static associate(models) {
            Event.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            })
        }
    }
    Event.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false, // Bắt buộc phải có userId mới cho tạo Event
                references: {
                    model: 'Users',
                    key: 'id'
                }
            }
        } ,
        {
            sequelize ,
            modelName : 'Event' ,
            tableName : 'Events' ,
            timestamps : true
        }
    )
    return Event ;
}