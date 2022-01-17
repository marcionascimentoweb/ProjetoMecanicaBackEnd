// Importa a biblioteca do Mongo
let db = require('./mongodb');

//Objeto usado como id no mongo
let ObjectId = require('mongodb').ObjectID;

//Classe ClienteDB
class ClienteDB{

  //Retorna a lista de Clientes
  static getClientes() {
    return new Promise(function (resolve, reject){
      let cliente = db.get().collection('cliente');
      cliente.find({}).toArray(function(error, result){
        if(error) return reject(error);
        resolve (result)
      });
    });
  }

  //Retorna o cliente pelo Id
  static getClienteById(id){
    return new Promise(function(resolve, reject){
      let cliente = db.get().collection('cliente');
      cliente.findOne({"_id":ObjectId(id)}, function(error, result){
        console.log(error);
        console.log(result);
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  //Retorna pelo IDCliente
  static getClienteByIdCliente(idCliente){
    return new Promise(function (resolve, reject){
      let clientes = db.get().collection('cliente');
      clientes.find({"idCliente": idCliente}).toArray(function(error, result){
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  //Salva um cliente no banco de dados
  //Recebe o JSON com dados do cliente como parâmetro
  static save(cliente){
    return new Promise(function (resolve, reject){
      let clientes = db.get().collection('cliente');
      clientes.insert(cliente, function(error, response){
        if(error){
          reject(error);
        }else{
          resolve(cliente);
        }
      });
    });
  }

  //Atualiza um cliente no banco de dados
  static update(cliente){
    return new Promise(function (resolve, reject){
      let clientes = db.get().collection('cliente');
      //Salva o id do cliente em uma variável
      let id = cliente._id;
      //remove o id do Json
      delete cliente._id;
      //Atualiza o carro pelo id
      clientes.update({"_id":ObjectId(id)}, cliente, function (error, response){
        if(error) {
          reject(error);
        }else {
          resolve(cliente);
        }
      });
      });
  }

   //Deleta um cliente pelo id
   static deleteById(id) {
    return new Promise(function(resolve, reject){
      let clientes = db.get().collection('cliente');
      clientes.removeOne({"_id":ObjectId(id)}, function (error, r){
        if (error) return reject(error);
        //Retorna a quantidade de registros deletados
        resolve(r.result.n);
      });
    });
  }

  //Deleta um cliente pelo idCliente
  static deleteByIdCliente(idCliente) {
    return new Promise(function(resolve, reject){
      let clientes = db.get().collection('cliente');
      clientes.remove({"idCliente":idCliente}, function (error, r){
        if (error) return reject(error);
        //Retorna a quantidade de registros deletados
        resolve(r.result.n);
      });
    });
}
}
module.exports = ClienteDB;

 
