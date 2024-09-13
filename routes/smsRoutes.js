// routes/smsRoutes.js

// Importa o módulo 'express' e cria um roteador para gerenciar rotas específicas.
const express = require('express');
const router = express.Router();

// Importa o modelo SMSMessage e a classe Op do Sequelize para operações avançadas de consulta.
const SMSMessage = require('../models/SMSMessage');
const { Op } = require('sequelize');

// Rota para atualizar o status da mensagem com um ID específico.
router.put('/sms/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10); // Obtém o ID da mensagem a partir dos parâmetros da URL e o converte para um número inteiro.
  const { status } = req.body; // Obtém o status da mensagem a partir do corpo da requisição.

  // Valida a entrada: verifica se o ID é um número válido e se o status é um dos valores permitidos.
  if (isNaN(id) || !['ENVIADO', 'RECEBIDO', 'ERRO DE ENVIO'].includes(status)) {
    return res.status(400).json({ error: 'Entrada inválida' }); // Responde com um erro 400 se a validação falhar.
  }

  try {
    // Encontra a mensagem com o ID especificado.
    const message = await SMSMessage.findByPk(id);

    if (!message) {
      return res.status(404).json({ error: 'Mensagem não encontrada' }); // Responde com um erro 404 se a mensagem não for encontrada.
    }

    // Atualiza o status da mensagem e salva as alterações no banco de dados.
    message.status = status;
    await message.save();

    res.json({ message: 'Status atualizado com sucesso' }); // Responde com uma mensagem de sucesso.
  } catch (error) {
    console.error('Erro ao atualizar o status:', error); // Registra o erro no console.
    res.status(500).json({ error: 'Erro no servidor' }); // Responde com um erro 500 se ocorrer uma falha no servidor.
  }
});

// Rota para buscar mensagens com um status específico.
router.get('/sms', async (req, res) => {
  const status = req.query.status; // Obtém o status da mensagem a partir dos parâmetros da query string.

  // Valida o status: verifica se o status é um dos valores permitidos.
  if (!['ENVIADO', 'RECEBIDO', 'ERRO DE ENVIO'].includes(status)) {
    return res.status(400).json({ error: 'Status inválido' }); // Responde com um erro 400 se a validação falhar.
  }

  try {
    // Busca mensagens com o status especificado que foram criadas nas últimas 24 horas.
    const messages = await SMSMessage.findAll({
      where: {
        status: status,
        createdAt: {
          [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000) // Calcula a data e hora de 24 horas atrás.
        }
      }
    });

    res.json(messages); // Responde com as mensagens encontradas.
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error); // Registra o erro no console.
    res.status(500).json({ error: 'Erro no servidor' }); // Responde com um erro 500 se ocorrer uma falha no servidor.
  }
});

// Exporta o roteador para que possa ser utilizado no arquivo principal do servidor.
module.exports = router;
