const express = require('express');
const route   = express.Router();

const briefingController = require('./src/controllers/briefingController');

//rotas de briefing
route.get('/', briefingController.index);
route.get('/briefing', briefingController.criar);
route.post('/briefing/registrar', briefingController.registrar);

module.exports = route;
