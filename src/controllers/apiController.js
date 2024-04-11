const ErrorHandler = require('../models/ErrorHandler');

exports.usuarios = (req, res) => {
  try {
    const usuarios = [
      { nome: 'Jefferson', idade: 23, profissao: 'Militar' },
      { nome: 'Danilo', idade: 24, profissao: 'Militar' },
      { nome: 'Caio', idade: 24, profissao: 'Desempregado' }
    ];

    return res.json(usuarios);
  } catch (error) {
    ErrorHandler.logAndRenderError(error, res, '404');
  }
};