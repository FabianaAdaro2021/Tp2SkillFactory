'use strict';
//const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
    const user = sequelize.define('user',{
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, 'El nombre es necesario'],
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, 'El apellido es necesario'],
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, 'La contraseña es obligatoria'],
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, 'El correo es necesario'],
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, 'La direccion es necesaria'],
      },
      role: {
        type: DataTypes.STRING,
        default: 'USER',
        required: [true],
      },
     },{
      timestamps: true,
      tableName: 'users',
    });
  
    user.associate = (models) => {
      user.hasMany(models.cars, { foreignKey: 'userId' });
    };
   
 
  return user;
};