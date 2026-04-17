const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
    const { id_livro, id_usuario, data_emprestimo, data_vencimento, status } = req.body;
    const stmt = db.prepare(`INSERT INTO emprestimos (id_livro, id_usuario, data_emprestimo, data_vencimento, status) VALUES (?, ?, ?, ?, ?)`);
    const info = stmt.run(id_livro, id_usuario, data_emprestimo, data_vencimento, status);
    res.status(201).json({ id: info.lastInsertRowid });
});

router.put('/:id', (req, res) => {
    const { status } = req.body;
    db.prepare('UPDATE emprestimos SET status = ? WHERE id = ?').run(status, req.params.id);
    res.json({ message: "Status atualizado" });
});

router.get('/', (req, res) => {
    const rows = db.prepare('SELECT * FROM emprestimos ORDER BY id DESC').all();
    res.json(rows);
});

router.get('/usuario/:id', (req, res) => {
    const rows = db.prepare('SELECT * FROM emprestimos WHERE id_usuario = ?').all(req.params.id);
    res.json(rows);
});

router.get('/status/:status', (req, res) => {
    const rows = db.prepare('SELECT * FROM emprestimos WHERE status = ?').all(req.params.status);
    res.json(rows);
});

module.exports = router;