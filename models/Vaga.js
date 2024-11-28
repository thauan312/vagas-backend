const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Vaga extends Model {}

Vaga.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isOpen: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true // Ou qualquer valor padrão desejado
  }
}, {
  sequelize,
  modelName: 'Vaga',
  tableName: 'vagas', // Nome da tabela no banco
  timestamps: true // Caso queira usar timestamps, pode habilitar aqui
});

module.exports = Vaga;
