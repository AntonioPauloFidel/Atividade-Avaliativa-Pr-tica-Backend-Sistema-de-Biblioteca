const express = require('express');
const db = require('./src/database.js');
// 1. Importe o arquivo de rotas (ajuste o nome do arquivo/caminho se necessário)
const livroRoutes = require('./src/routes/livro.js');

const app = express();
app.use(express.json());

// 2. Registre as rotas no app
app.use(livroRoutes);

app.get('/', (req, res) => {
    res.json({ mensagem: 'Servidor funcionando!' });
});

app.listen(3001, () => console.log('Rodando na porta 3001'));
