const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tarea = sequelize.define('tareas', {
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true
  },
  fecha_vencimiento: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true
  },
  estado: {
    type: DataTypes.ENUM('Pendiente', 'En progreso', 'Completada'),
    allowNull: false,
    unique: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
});

module.exports = Tarea;