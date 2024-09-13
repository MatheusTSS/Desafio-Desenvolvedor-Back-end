// server.js

// Importa o módulo 'express' e cria uma nova aplicação Express.
const express = require('express');
const app = express();

// Importa as rotas definidas para SMS e a configuração do banco de dados.
const smsRoutes = require('./routes/smsRoutes');
const sequelize = require('./config/database');

// Middleware para interpretar dados JSON no corpo das requisições.
app.use(express.json());

// Define que todas as rotas que começam com '/api' devem ser gerenciadas pelo módulo 'smsRoutes'.
app.use('/api', smsRoutes);

// Sincroniza o modelo do Sequelize com o banco de dados e, se bem-sucedido, inicia o servidor Express.
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000'); // Mensagem de sucesso ao iniciar o servidor.
  });
}).catch(error => {
  // Em caso de erro ao conectar com o banco de dados, imprime a mensagem de erro no console.
  console.error('Erro ao conectar ao banco de dados:', error);
});
