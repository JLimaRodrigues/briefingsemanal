// server.js
require('dotenv').config();

const express = require('express');
const app = express();

const path = require('path');
const routes = require('./routes');

const flash   = require('connect-flash');
const connection = require('./connection');
const sessionOptions = require('./sessionOptions');

const helmet = require('helmet');
const csrf   = require('csurf');
const { csrfMiddleware } = require('./src/middlewares/middleware');
const ErrorHandler = require('./src/models/ErrorHandler');
const requestLogger = require('./src/middlewares/requestLogger');
const cors = require('cors');

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
app.use(flash());

// Configurações da engine do projeto
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(helmet.referrerPolicy({policy: ["origin", "unsafe-url"]}));
app.use(csrf());

app.use(csrfMiddleware);

app.use(cors());

app.use(routes);

app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acesse: http://localhost:3000');
    console.log('Rodando');
  });
});
