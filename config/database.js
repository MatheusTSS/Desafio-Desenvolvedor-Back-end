// config/database.js

// Importa a classe Sequelize da biblioteca 'sequelize', que é usada para interagir com bancos de dados.
const { Sequelize } = require('sequelize');

// Cria uma nova instância do Sequelize para estabelecer uma conexão com o banco de dados SQLite.
// O objeto passado para o Sequelize define o tipo de banco de dados e o local onde o arquivo do banco será armazenado.
const sequelize = new Sequelize({
  dialect: 'sqlite',                // Define o dialeto do banco de dados como 'sqlite', indicando que estamos usando SQLite.
  storage: './database.sqlite'      // Especifica o caminho onde o arquivo do banco de dados SQLite será salvo.
});

// Exporta a instância do Sequelize para que possa ser utilizada em outros arquivos do projeto.
module.exports = sequelize;