const Database = require('better-sqlite3');
const db = new Database('database.db');

// Criar tabelas
db.exec(`
  CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    autores TEXT NOT NULL,
    data_publicacao TEXT NOT NULL,
    qtd_paginas INTEGER NOT NULL,
    num_edicao INTEGER NOT NULL,
    categoria TEXT CHECK(categoria IN ('ACADEMICO', 'INFANTIL', 'LITERATURA', 'AUTOBIOGRAFIA')) NOT NULL,
    status TEXT CHECK(status IN ('DISPONIVEL', 'INDISPONIVEL')) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    telefone TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS emprestimos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_livro INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    data_emprestimo TEXT NOT NULL,
    data_vencimento TEXT NOT NULL,
    status TEXT CHECK(status IN ('ATIVO', 'ATRASADO', 'CONCLUIDO')) NOT NULL,
    FOREIGN KEY (id_livro) REFERENCES livros (id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
  );
`);

module.exports = db;