const express = require('express');
const route   = express.Router();

const briefingController = require('./src/controllers/briefingController');
const apiController = require('./src/controllers/apiController');

//rotas de briefing
route.get('/', briefingController.index);
route.get('/briefing', briefingController.criar);
route.post('/briefing/registrar', briefingController.registrar);
route.get('/briefing/editar/:id', briefingController.editar);
//route.post('/briefing/atualizar/:id', briefingController.atualizar);

//rotas de relatorios

//rotas de agenda

//rotas de código
route.get('/api/usuarios', apiController.usuarios);

module.exports = route;
