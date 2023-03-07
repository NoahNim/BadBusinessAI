'use strict';
const {
  Model,
  Validator
} = require('sequelize');

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class BadIdea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BadIdea.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  BadIdea.init({
    idea: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BadIdea',
  });
  return BadIdea;
};