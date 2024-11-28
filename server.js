require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/database');

const vagaRoutes = require('./routes/vagaRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/auth', authRoutes);

//conectar rotas
app.use('/api/vagas', vagaRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
