// models/SMSMessage.js

// Importa o tipo de dados DataTypes da biblioteca Sequelize e a configuração do banco de dados.
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define o modelo 'SMSMessage' com suas propriedades e configurações.
const SMSMessage = sequelize.define('SMSMessage', {
  id: {
    type: DataTypes.INTEGER,           // Tipo de dado para o ID da mensagem, que é um número inteiro.
    primaryKey: true,                  // Define o ID como a chave primária da tabela.
    autoIncrement: true,              // Define que o valor do ID será automaticamente incrementado a cada novo registro.
  },
  status: {
    type: DataTypes.STRING,            // Tipo de dado para o status da mensagem, que é uma string.
    allowNull: true,                   // Permite que o status seja nulo.
    validate: {
      isIn: [['ENVIADO', 'RECEBIDO', 'ERRO DE ENVIO']], // Valida que o status deve ser um dos valores permitidos.
    },
  },
  createdAt: {
    type: DataTypes.DATE,              // Tipo de dado para a data de criação da mensagem.
    defaultValue: DataTypes.NOW,       // Define que o valor padrão é a data e hora atual no momento da criação.
  },
  updatedAt: {
    type: DataTypes.DATE,              // Tipo de dado para a data de atualização da mensagem.
    defaultValue: DataTypes.NOW,       // Define que o valor padrão é a data e hora atual no momento da atualização.
  },
});

// Exporta o modelo 'SMSMessage' para que possa ser utilizado em outras partes do aplicativo.
module.exports = SMSMessage;
