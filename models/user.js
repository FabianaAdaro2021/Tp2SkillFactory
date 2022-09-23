'use strict';
const {  Model} = require('sequelize');
const db = require('./index')
let rolesValidos = {
    values: ["ADMIN", "USER"],
    message: '{VALUE} no es un rol válido'
}
const Schema = Model.Schema;

let usuarioSchema = new Schema({

    
    name: {
      
      type: String,
      allowNull: false,
      unique: false,
      required: [true, 'El nombre es necesario'],
    },
    lastName: {
      type: String,
      allowNull: false,
      unique: false,
      required: [true, 'El apellido es necesario'],
    },
    email: {
      type: String,
      defaultValue: null,
      allowNull: true,
      required: [true, 'El correo es obligatorio'],
    },
    password: {
      type: String,
      allowNull: false,
      required: [true, 'La contraseña es obligatoria'],
    },
    role: {
      type: String,
      default: 'USER',
      required: [true],
      enum: rolesValidos,
  }

    
 });
 
  
  // elimina la key password del objeto que retorna al momento de crear un usuario
usuarioSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}
user.associate = (models) => {
  user.hasMany(models.cars, {  foreignKey: 'userId' });
};
const User = db.model('user', usuarioSchema);

module.exports = User;

