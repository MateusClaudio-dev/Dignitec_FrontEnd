// Importa os pacotes
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer'); // <--- novo 
const path = require('path');
const { error } = require('console');
require("dotenv").config();


// Cria o app Express
const app = express();
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

// Habilita a pasta "uploads" para acesso público
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configura o Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // pasta onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nome único
  }
});
const upload = multer({ storage }); 

// Configura a conexão com o banco de dados MySQL
// Node.js example

// conexão localHost c/ mh maquina pessoal 
//const db = mysql.createConnection({
//  host: "localhost",
//  user: "root",
//  password: "cimatec",
//  database: "dignitec",
//  port: 3306
//});

// Configura a conexão com o banco de dados MySQL usando o .env
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,       // Puxa o HOST do .env
  user: process.env.MYSQLUSER,       // Puxa o USER do .env
  password: process.env.MYSQLPASSWORD, // Puxa a SENHA do .env
  database: process.env.MYSQLDATABASE, // Puxa o NOME DO BANCO do .env
  port: process.env.MYSQLPORT || 3306  // Puxa a PORTA do .env (se não achar, usa 3306)
});

db.connect((err) => {
  if (err) console.error('Erro ao conectar ao MySQL:', err);
  else console.log('Conectado ao MySQL com sucesso!');
});

// Rota POST com upload da imagem
app.post('/anuncios', upload.single('imagemCapa'), (req, res) => {
  console.log("Entrei  na função")
  const { nomeProjeto, categoria, descricao, localizacao, contato } = req.body;
  const imagemCapa = req.file ? req.file.filename : null; 
  console.log("Salvei o body")
  const sql = 'INSERT INTO form_anuncio (nomeProjeto, categoria, descricao, localizacao, contato, imagemCapa) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [nomeProjeto, categoria, descricao, localizacao, contato, imagemCapa];
  console.log('cheguei até aqui')
  db.query(sql, values, (err) => {
    if (err) {
      console.error('Erro ao inserir:', err);
      res.status(500).json({ message: 'Erro ao cadastrar anúncio.' });
    } else {
      res.status(201).json({ message: 'Anúncio cadastrado com sucesso!' });
    }
  });
});

// Listar anúncios
app.get('/anuncios', (req, res) => {
  db.query('SELECT * FROM form_anuncio', (err, results) => {
    if (err) res.status(500).json({ message: 'Erro ao buscar anúncios.' });
    else res.json(results);
  });
});

// ROTA PARA EXCLUIR ANÚNCIOS
app.delete('/anuncios/:id', (req, res) => {
  const idAnuncio = req.params.id
  const sql = 'DELETE FROM form_anuncio WHERE id = ?';

  db.query(sql, [idAnuncio], (err, result) => {
    if (err) {
      console.error('Erro ao deletar', err);
      return res.status(500).json({message: 'Erro ao excluir anúncio.'});
    }
    res.status(200).json({message: 'Anúncio removido da vitrine com sucesso'});
  });
});

// ROTA PARA EDITAR ANÚNCIOS
app.put('/anuncios/:id', upload.single('imagemCapa'), (req, res) => {
  const idAnuncio = req.params.id
  const { nomeProjeto, categoria, descricao, localizacao, contato } = req.body;
  const imagemCapa = req.file ? req.file.filename : null;
  const sql = 'UPDATE form_anuncio SET nomeProjeto = ?, categoria = ?, descricao = ?, localizacao = ?, contato = ?, imagemCapa = ? WHERE id = ?';
  const values = [nomeProjeto, categoria, descricao, localizacao, contato, imagemCapa, idAnuncio];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err, 'Erro ao tentar editar anúncio')
      return res.status(500).json({message: 'Erro ao tentar editar anuncio'})
    }
    return res.status(200).json({message: 'Anúncio editado com sucesso!'});
  });
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));

