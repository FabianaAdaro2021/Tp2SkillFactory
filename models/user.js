const { Model } = require('sequelize');
let rolesValidos = {  values: ["ADMIN", "USER"],
  message: '{VALUE} no es un role válido'
}

module.exports = (sequelize, DataTypes) => {

  const user = sequelize.define('user', {
   
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
    lastname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(255),
      default: 'USER',
      required: [true],
      enum: rolesValidos,
  }
  }, {
    timestamps: true,
    tableName: 'users',
  });

  user.associate = (models) => {
    user.hasMany(models.cars, { foreignKey: 'userId' });
  };

  return user;
};

