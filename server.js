// server.js
require('dotenv').config();

const express = require('express');
const app = express();

const path = require('path');
const routes = require('./routes');

const connection = require('./connection');
const sessionOptions = require('./sessionOptions');

//configurações do BD
connection.authenticate()
  .then(() => {
    return connection.sync();
  })
  .then(() => {
    app.emit('pronto');
  })
  .catch((e) => {
    console.error('Erro ao conectar ao banco de dados:', e);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Arquivos estáticos
app.use(express.static(path.resolve(__dirname, 'public')));

// Configurações da session
app.use(sessionOptions);

// Configurações da engine do projeto
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(routes);

app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acesse: http://localhost:3000');
    console.log('Rodando');
  });
});
