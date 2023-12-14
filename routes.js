const express = require('express');
const route   = express.Router();

const homeController = require('./src/controllers/homeController');
const briefingController = require('./src/controllers/briefingController');

route.get('/', homeController.inicio);

//rotas de briefing
route.get('/briefing', briefingController.index);
route.post('/briefing/registrar', briefingController.registrar);

module.exports = route;
