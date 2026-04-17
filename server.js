// Importação das bibliotecas necessárias
const express = require('express'); // Framework web para gerenciar rotas e requisições
const app = express(); // Inicialização da aplicação Express

// Middleware para permitir que o servidor entenda dados enviados em formato JSON
app.use(express.json());

// Importação dos módulos de rotas (separados por responsabilidade)
const rotaUsuarios = require('./src/routes/usuario.js');
const rotaLivros = require('./src/routes/livro.js');
const rotaEmprestimos = require('./src/routes/emprestimo.js');

// Definição dos prefixos de rota. 
// Ex: Tudo que começar com /livros será gerenciado pelo arquivo livro.js
app.use('/usuarios', rotaUsuarios);
app.use('/livros', rotaLivros);
app.use('/emprestimos', rotaEmprestimos);

// Rota raiz para teste de disponibilidade do servidor
app.get('/', (req, res) => {
    res.json({ mensagem: 'Servidor funcionando e pronto para requisições!' });
});

// Inicialização do servidor na porta 3001

app.listen(3001, () => {
    console.log(`🚀 Servidor rodando com sucesso na porta 3001 `);
});