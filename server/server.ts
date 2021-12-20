import express = require('express');
import bodyParser = require("body-parser");


import { Usuario } from '../common/usuario';
import { Entregador } from '../common/entregador';
import { Cadastro } from './cadastro';
import { EntregaService } from './src/entregas-service';
import { Entrega } from '../common/entrega';

var app = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
app.use(express.json());
app.use(bodyParser.json());

//app.use(express.urlencoded({ extended: true}));

let usuarios: Usuario[] = [];
let usuario_sessao:Usuario = null;

var entregaService: EntregaService = new EntregaService();


app.get('/entregas', function(req, res){
  const entregas = entregaService.get();
  res.send(JSON.stringify(entregas));
});

app.get('/entregas/disponiveis', function(req, res){
  const entregas = entregaService.getByEntregadorIdNull();
  res.send(JSON.stringify(entregas));
});

app.get('/entregas/:id', function(req, res){
  const id = req.params.id;
  const entrega = entregaService.getById(Number(id));
  if (entrega) {
    res.send(entrega);
  } else {
    res.status(404).send({ message: `Entrega ${id} could not be found`});
  }
});

app.get('/entregas/entregador/:id', function(req, res){
  const id = req.params.id;
  const entregas = entregaService.getByEntregadorId(Number(id));
  if (entregas) {
    res.send(entregas);
  } else {
    res.status(404).send({ message: `Entregas from entregador ${id} could not be found`});
  }
});

app.post('/entregas', function(req: express.Request, res: express.Response){
  const entrega: Entrega = <Entrega> req.body;
  try {
    const result = entregaService.add(entrega);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(403).send({ message: "Entrega list is full"});
    }
  } catch (err) {
    const {message} = err;
    res.status(400).send({ message })
  }
});

app.put('/entregas', function (req: express.Request, res: express.Response) {
  const entrega: Entrega = <Entrega> req.body;
  const result = entregaService.update(entrega);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send({ message: `Entrega ${entrega.id} could not be found.`});
  }
});

app.post('/usuarios/cadastrar', (req: express.Request, res: express.Response) => {
    let cpf = req.body.cpf;
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
//AQUI
    let usuario;
    if(req.body.hasOwnProperty('mascara')){
        usuario = new Entregador(cpf, nome, email, senha);
    }

    let nulo = false;
    if (cpf === '' || nome === '' || email === '' || senha === ''){
        nulo = true;
    }

    if(nulo){
        res.send({
            failure: 'Alguma das entradas esta nula!',
        })
    }
    else{
        let existe = false;
        for (let i of usuarios){
            if(i.Cpf == usuario.Cpf || i.Email == usuario.Email){
                existe = true;
            }
        }

        if(existe){
            res.send({
                failure: 'Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!',
            })
        }
        else{
            // console.log(usuarios);
            usuarios.push(usuario);
            // console.log(usuarios);

            res.send({
                success: 'Usuario cadastrado com sucesso!',
            })
        }
        console.log(usuarios);
    }
});

app.get('/usuario', (req: express.Request, res: express.Response) => {
    res.send(JSON.stringify(Array.from(usuarios)));
});

app.post('/login', (req: express.Request, res: express.Response) => {
    let email = req.body.email;
    let senha = req.body.senha;
    
    let nulo = false;
    if(email === '' || senha === ''){
        nulo = true;
    }

    if(nulo){
        res.send({
            failure: 'E-mail ou senha nulos!',
        })
    }
    else{
        let existe = false;
        for (let i of usuarios){
            if(i.Email == email && i.Senha == senha){
                existe = true;
                usuario_sessao = i;
            }
        }

        if(existe){
            res.send({
                success: 'Login realizado com sucesso!',
            })
        }
        else{
            res.send({
                failure: 'E-mail ou senha incorretos!',
            })
        }
    }    
    console.log(usuario_sessao);
})

app.post('/atualiza_cadastro', (req: express.Request, res: express.Response) => {
    if(usuario_sessao != null){
        let cpf = req.body.cpf;
        let nome = req.body.nome;
        let email = req.body.email;
        let senha = req.body.senha;

        let usuario_modificado;
        if(usuario_sessao.hasOwnProperty('mascara')){
            usuario_modificado = new Entregador(cpf, nome, email, senha);
        }
        let nulo = false;
        if (cpf === '' || nome === '' || email === '' || senha === ''){
            nulo = true;
        }

        if(nulo){
            res.send({
                failure: 'Alguma das entradas esta nula!',
            })
        }
        else{
            let index = 0;
            for (let i of usuarios){
                if(i.Cpf == usuario_sessao.Cpf && i.Email == usuario_sessao.Email){
                    break;
                }
                index += 1;
            }

            let existe = false;
            let index_aux = 0;
            for (let i of usuarios){
                if((i.Cpf == usuario_modificado.Cpf || i.Email == usuario_modificado.Email) && index_aux != index){
                    existe = true;
                }
                index_aux += 1;
            }

            if(existe){
                res.send({
                    failure: 'Um outro usuario com esse CPF ou esse EMAIL ja existe na base de dados!',
                })
            }
            else{
                usuarios[index] = usuario_modificado;
                usuario_sessao = usuario_modificado;

                res.send({
                    success: 'Atualizacao realizada com sucesso!',
                })
            }
            console.log(usuarios);
            console.log(usuario_sessao);
        }
    }
    else{
        res.send({
            failure: 'Voce nao esta logado no sistema para atualizar seus dados!',
        })
    }  
})

app.get('/meu_usuario', (req: express.Request, res: express.Response) => {
    res.send((usuario_sessao));
})

app.post('/desloga', (req: express.Request, res: express.Response) => {

    usuario_sessao = null;
    
    res.send({
        success: 'Usuario deslogado do sistema com sucesso!',
    })
    
    console.log(usuario_sessao);
})


 var server = app.listen(3000, function () {
    console.log('Entregadores app listening on port 3000!');
  })

function closeServer(): void {
    server.close();
}
  
export { app, closeServer }