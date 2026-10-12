const db = require('../configuraciones/db');
const { DataTypes } = require('sequelize');
const Carrera = require('./carrera');

const Estudiante = db.define('Estudiante', {
  identidad: {
    type: DataTypes.STRING(13),
    allowNull: false,
    unique: true,
  },
  cuenta: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  primerNombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  segundoNombre: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  primerApellido: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  segundoApellido: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  correoElectronico: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'estudiantes',
  timestamps: false, // Desactivar las columnas createdAt y updatedAt
});

// Definir la relación entre Estudiante y Carrera
Estudiante.belongsTo(Carrera, { foreignKey: 'carreraId', as: 'carrera' });
Carrera.hasMany(Estudiante, { foreignKey: 'carreraId', as: 'estudiantes' });

module.exports = Estudiante;