'use strict' ;

const {Model ,DataTypes} = require('sequelize') ;

module.exports = (sequelize , DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User ,{
                foreignKey : 'userId' ,
                as : 'user'
            })
        }
    }
Post.init (
        {
            title : {
                type : DataTypes.STRING ,
                allowNull : false
            },
            content : {
                type: DataTypes.TEXT,
                allowNull: false
            } ,
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }

        } ,
        {
            sequelize ,
            modelName : 'Post' ,
            tableName : 'Posts' ,
            timestamps : true
        }
    )
    return Post
}