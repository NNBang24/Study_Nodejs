'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductTag extends Model {
    static associate(models) {}
  }

  ProductTag.init(
    {
     
    },
    {
      sequelize,
      modelName: 'ProductTag',
      tableName: 'ProductTags',
      timestamps: false // bảng trung gian thường không cần timestamps
    }
  );

  return ProductTag;
};
