const { Sequelize } = require('sequelize');

// Configuração do Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Nome do arquivo SQLite
  logging: false,
});

module.exports = sequelize;
