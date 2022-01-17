let express = require('express');
const router = express.Router();
const faleConoscoDB = require('../model/faleConoscoDB');
const exec = require('./utils');

//GET em /fale Conosco
router.get('/', exec (async (req, res, next) => {
  let faleConosco = await faleConoscoDB.getFaleConosco();
    res.json(faleConosco);
  }));

//POST para salvar Fale Conosco
router.post('/', exec(async (req, res, next) =>{
  let faleConosco = await faleConoscoDB.save(req.body);
res.json(faleConosco);
}));

module.exports = router;