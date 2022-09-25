'use strict';
//const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
    const user = sequelize.define('user',{
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, 'El nombre es necesario'],
        validate: {
          isAlpha:{
            msg:"El nombre solo puede contener letras"
          },
          len:{ args:[2,255],
            msg:"El nombre debe contener minimamente dos caracteres"
          }
          
        }
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, 'El apellido es necesario'],
        validate: {
          isAlpha:{
            msg:"El apellido solo puede contener letras"
          },
          len:{ args:[2,255],
            msg:"El apellido debe contener minimamente dos caracteres"
          }
          
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, 'La contraseña es obligatoria'],
        validate: {
          
          len:{ args:[5,255],
            msg:"La contraseña debe contener minimamente cinco caracteres"
          }
          
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: [true, 'El correo es necesario'],
        validate: {
          isEmail:{
            msg:"El email debe ser un correo valido "
          },
          len:{ args:[2,255],
            msg:"El nombre debe contener minimamente dos caracteres"
          }
          
        }
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