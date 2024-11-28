const sequelize = require('../config/database');
const User = require('./User');
const Vaga = require('./Vaga');

// Relacionamentos, se necessário
User.hasMany(Vaga);
Vaga.belongsTo(User);

sequelize.sync({ force: false }) // Altere para `true` apenas durante o desenvolvimento
  .then(() => console.log('Banco de dados sincronizado'))
  .catch((error) => console.error('Erro ao sincronizar o banco de dados', error));

module.exports = { sequelize, User, Vaga };
