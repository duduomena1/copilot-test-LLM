const express = require('express');
const CepController = require('../controllers/cepController');

const router = express.Router();
const cepController = new CepController();

router.get('/:cep', cepController.getAddressByCep.bind(cepController));

module.exports = router;