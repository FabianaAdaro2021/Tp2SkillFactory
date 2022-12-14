'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cars.belongsTo(models.user)
      
    }
  }
  cars.init({
    patent: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    years: DataTypes.INTEGER,
    engine: DataTypes.STRING,
    color: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cars',
  });
  return cars;
};