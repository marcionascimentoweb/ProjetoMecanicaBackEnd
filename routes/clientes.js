let express = require('express');
const router = express.Router();
const ClienteDB = require('../model/ClienteDB');
const exec = require('./utils');

//GET em /clientes
router.get('/', exec (async (req, res, next) => {
  let cliente = await ClienteDB.getClientes();
    res.json(cliente);
  }));

//GET em clientes/id 
router.get('/id/:id', exec (async (req, res, next) => {
  let id = req.params.id;
  let cliente = await ClienteDB.getClienteById(id);
  res.json(cliente)
  }));

//GET em clientes/idCliente 
router.get('/:idCliente', exec (async (req, res, next) => {
  let idCliente = req.params.idCliente;
  let cliente = await ClienteDB.getClienteByIdCliente(idCliente);
  res.json(cliente);
  }));

//DELETE em /cliente/id
router.delete('/id/:id', exec(async(req, res, next) => {
  let id = req.params.id;
      let affectedRows = await ClienteDB.deleteById(id);
       res.json ({msg: affectedRows > 0 ? 'Cliente deletado com sucesso.' : "Nenhum cliente excluído"});
}));

//DELETE em /cliente/idCliente
router.delete('/:idCliente', exec(async(req, res, next) => {
  let idCliente = req.params.idCliente;
      let affectedRows = await ClienteDB.deleteByIdCliente(idCliente);
       res.json ({msg: affectedRows > 0 ? 'Cliente deletado com sucesso.' : "Nenhum cliente excluído"});
}));   

//POST para salvar um cliente
router.post('/', exec(async (req, res, next) =>{
  // Cliente enviado no formato JSON
  let cliente = await ClienteDB.save(req.body);
  res.json(cliente);
  }));

//  PUT para atualizar um cliente
router.put('/id/:_id', exec (async(req, res, next)=> {
  //Cliente enviado no formato JSON
  let cliente = await ClienteDB.update(req.body);
   res.json ({ msg: 'Cliente atualizado com sucesso.'})
  }));  

//Exporta as rotas para ser utilizado em outro arquivo
module.exports = router;  

