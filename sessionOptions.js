const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const connection = require('./connection'); // Importe a instância do Sequelize configurada anteriormente

const sessionOptions = session({
  secret: 'algumacoisaDesegredo',
  store: new SequelizeStore({
    db: connection,
    tableName: 'sessions',
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // Uma semana
    httpOnly: true,
  },
});

module.exports = sessionOptions;