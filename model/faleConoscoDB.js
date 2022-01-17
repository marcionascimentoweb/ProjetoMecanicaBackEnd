
// Importa a biblioteca do Mongo
let db = require('./mongodb');

//Objeto usado como id no mongo
let ObjectId = require('mongodb').ObjectID;

class faleConoscoDB{

  // Retorna a lista de Clientes
  static getFaleConosco() {
    return new Promise(function (resolve, reject){
      let faleConosco = db.get().collection('faleConosco');
      faleConosco.find({}).toArray(function(error, result){
        if (error) return reject(error);
        resolve (result)
      });
    });
  }

  
  //Salva um cliente no banco de dados
  //Recebe o JSON com dados do cliente como parâmetro
  static save(faleConosco){
    return new Promise(function (resolve, reject){
      let faleConoscos = db.get().collection('faleConosco');
      faleConoscos.insert(faleConosco, function(error, response){
        if(error){
          reject(error);
        }else{
          resolve(faleConosco);
        }
      });
    });
  }
}

module.exports = faleConoscoDB;