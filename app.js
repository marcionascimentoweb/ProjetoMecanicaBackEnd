let db = require('./model/mongodb');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

//Configura para ler dados do POST por form-urlecoded e application/json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next){
   res.header('Access-Control-Allow-Origin', '*');
      res.header("Access-Control-Allow-Credentials", "true");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Codingpedia, Authorization');
      next();
});

//Rotas
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/faleconosco', require('./routes/faleConosco'));

//Teste de Erro
app.get('/teste_erro', function (req, res){
  throw Error('Erro Ninja');
})

//Rotas não encontrada '404' (usando Middlewares)
app.use(function(req, res, next){
  res.status(404)
  res.json({err : "Não encontrado"});
})

//Rotas genérica de erro '500'
app.use(function(err, req, res, next){
  //imprime a stacktrace do erro no concole para debug
  console.error(err);
  res.status(500);
  res.json({erro: 'Erro na transação: '});
});
{
  erro: "Errpo na transação"
}

// Conecta no Mongo para iniciar
db.connect(function(err){
  if(err){
  console.log('Erro ao conectar no mongo Mongo.');
  process.exit(1)
}else{
  console.log("MongoDB conectado: ", db);
  //Conexão ok. Vamos iniciar o servidor do Node
  let server = app.listen(3000, function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log("Servidor node no ar: http://%s:%s", host, port)
  });

}
})

