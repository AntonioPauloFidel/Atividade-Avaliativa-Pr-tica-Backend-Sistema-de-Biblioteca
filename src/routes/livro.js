const express = require('express');
const router = express.Router();
const db = require('../database');



router.post('/livro/cadastrar', (req, res) => {
    const { nome, autores, data_publicacao, qtd_paginas, num_edicao, categoria, status } = req.body;

    const stmt = db.prepare(`INSERT INTO livros (nome, autores, data_publicacao, qtd_paginas, num_edicao, categoria, status)VALUES (?, ?, ?, ?, ?, ?, ?)`); 
    
    const resultado = stmt.run(nome,autores,data_publicacao,qtd_paginas, num_edicao, categoria, status)
    
    res.json({ mensagem: 'Produto cadastrado com sucesso!' });
});

router.put('/livro/atualizar', (req, res) => {
    const { nome, autores, data_publicacao, qtd_paginas, num_edicao, categoria, status } = req.body;

    const stmt = db.prepare(`UPDATE livros SET nome=?, autores=?, data_publicacao=?, qtd_paginas=?, num_edicao=?, categoria=?, status=? WHERE id=?`);

    const info = stmt.run(nome, autores, data_publicacao, qtd_paginas, num_edicao, categoria, status, req.params.id);

    res.json({ message: "Livro atualizado" });
});

router.delete('/livro/:id', (req, res) => {
    const info = db.prepare('DELETE FROM livros WHERE id = ?').run(req.params.id);
    res.json({ message:"Livro deletado com sucesso" });
});

router.get('livro/todos', (req, res) => {
    const rows = db.prepare('SELECT * FROM livros').all();
    res.json(rows);
});


router.get('livro/busca', (req, res) => {
    const { nome } = req.query;
    const rows = db.prepare('SELECT * FROM livros WHERE nome LIKE ?').all(`%${nome}%`);
    res.json(rows);
});


router.get('/copias', (req, res) => {
    const rows = db.prepare('SELECT nome, num_edicao, COUNT(*) as qtd FROM livros GROUP BY nome, num_edicao').all();
    res.json(rows);
});



module.exports = router;