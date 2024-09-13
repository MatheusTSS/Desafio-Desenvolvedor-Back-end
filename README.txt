Descrição

Este projeto implementa uma API para gerenciar mensagens SMS utilizando Node.js, Express e Sequelize com SQLite. 
A API permite atualizar o status de mensagens e buscar mensagens por status nas últimas 24 horas.

Estrutura do Projeto:

config/database.js: Configuração da conexão com o banco de dados SQLite usando Sequelize.

models/SMSMessage.js: Definição do modelo SMSMessage para a tabela de mensagens no banco de dados.

routes/smsRoutes.js: Rotas para gerenciar mensagens SMS, incluindo atualização de status e busca por status.

server.js: Configuração e inicialização do servidor Express, integração com Sequelize e definição das rotas.

Dependências:

express: Framework para criação do servidor.
sequelize: ORM para interagir com o banco de dados.
sqlite3: Banco de dados SQLite.