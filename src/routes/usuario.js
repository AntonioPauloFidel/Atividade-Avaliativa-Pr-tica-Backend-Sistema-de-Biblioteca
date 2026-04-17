const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
    const { nome, cpf, telefone, email } = req.body;
    try {
        const stmt = db.prepare('INSERT INTO usuarios (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)');
        const info = stmt.run(nome, cpf, telefone, email);
        res.status(201).json({ id: info.lastInsertRowid, nome });
    } catch (e) { res.status(400).json({ error: "CPF ou Email já cadastrado" }); }
});

router.get('/:cpf', (req, res) => {
    const user = db.prepare('SELECT * FROM usuarios WHERE cpf = ?').get(req.params.cpf);
    user ? res.json(user) : res.status(404).json({ error: "Não encontrado" });
});

router.delete('/:id', (req, res) => {
    const info = db.prepare('DELETE FROM usuarios WHERE id = ?').run(req.params.id);
    res.json({ deleted: info.changes });
});

module.exports = router;