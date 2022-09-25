'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.cars, {
        foreignKey: 'userId'
      })
    }
  }
  user.init({
    username: DataTypes.STRING, allowNull: false,unique: false,
    password: DataTypes.STRING,allowNull: false,
    name: DataTypes.STRING,defaultValue: null,allowNull: true,
    lastname: DataTypes.STRING,defaultValue: null,allowNull: true,
    email: DataTypes.STRING,defaultValue: null,allowNull: true,
    phonenumber: DataTypes.STRING,defaultValue: null,allowNull: true,
    cuil: DataTypes.STRING,defaultValue: null,allowNull: true,
    address: DataTypes.STRING,defaultValue: null,allowNull: true,
    role: DataTypes.STRING,default: 'USER', required: true,
  }, {
    sequelize,
    modelName: 'user',
  });
  
  
  return user;
};