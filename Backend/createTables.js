const mysql = require('mysql2');
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

const sql = `
CREATE TABLE IF NOT EXISTS form_anuncio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomeProjeto VARCHAR(255),
    categoria VARCHAR(255),
    descricao TEXT,
    localizacao VARCHAR(255),
    contato VARCHAR(255),
    imagemCapa VARCHAR(255),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

db.query(sql, err => {
  if (err) console.log("Erro:", err);
  else console.log("Tabela criada!");
  process.exit();
});
