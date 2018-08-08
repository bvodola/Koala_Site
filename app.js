'use strict'
const http = require ('http'); // requerindo o HTTP
const express = require('express'); //requerindo o Express.JS
const path = require ('path')// requerindo o módulo para ter o caminho de sites
const bodyParser = require('body-parser');
const app = express(); //realizando funções para servidor
const mailgun = require('mailgun.js');

const api_key = 'key-50ed972073d94219a78c57acd5c1e6a8-a5d1a068-c049edd3';

const mg = mailgun.client({
    username: 'api',
    key: api_key
  });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html')); //Página Inicial
});

app.get('/contato', function (req, res) {
    res.sendFile(path.join(__dirname+'/contato.html')); //Contato
    
});

app.post('/contato', function(req,res) {
    mg.messages.create('SEU_DOMINIO_NO_MAILGUN', {
      from: 'FROM',
      to: 'TO',
      subject: req.body.nome+' '+req.body.email+" "+req.body.celular+' '+req.body.assunto ,
      text: req.body.msg
    })
    .then(msg => {console.log(msg); res.sendStatus(200)}) // logs response data
    .catch(err => {console.log(err); res.sendStatus(500)}); // logs any error
  });



app.get('/servicos', function (req, res) {
    res.sendFile(path.join(__dirname+'/servicos.html')); //Serviços
});


app.listen(3000, function () {
  console.log('Servidor Rodando no localhost:3000');
  console.log(' Para desligar use Ctrl + C :v')
});