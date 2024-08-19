const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt'); // Asegúrate de instalar bcrypt

const Usuario = sequelize.define('usuarios', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  usuario_nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
});



module.exports = Usuario;