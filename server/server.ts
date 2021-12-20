import express = require('express');
//import bodyParser = require("body-parser");

import { Usuario } from '../common/usuario';
import { Entregador } from '../common/entregador';
import { Cadastro } from './cadastro';


var servidor = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

servidor.use(allowCrossDomain);
servidor.use(express.json());
servidor.use(express.urlencoded({ extended: true}));

let usuarios: Usuario[] = [];
let usuario_sessao:Usuario = null;

servidor.post('/usuarios/cadastrar', (req: express.Request, res: express.Response) => {
    let cpf = req.body.cpf;
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
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
            res.send({
                success: 'Usuario cadastrado com sucesso!',
            })
        }
    }
})

servidor.get('/usuario', (req: express.Request, res: express.Response) => {
    res.send(JSON.stringify(Array.from(usuarios)));
})

servidor.post('/login', (req: express.Request, res: express.Response) => {
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
})

servidor.post('/atualiza_cadastro', (req: express.Request, res: express.Response) => {
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
        }
    }
    else{
        res.send({
            failure: 'Voce nao esta logado no sistema para atualizar seus dados!',
        })
    }  
})

servidor.get('/meu_usuario', (req: express.Request, res: express.Response) => {
    res.send((usuario_sessao));
})

servidor.post('/desloga', (req: express.Request, res: express.Response) => {

    usuario_sessao = null;
    
    res.send({
        success: 'Usuario deslogado do sistema com sucesso!',
    })
})

var server = servidor.listen(3000, function () {
    console.log('Example app listening on port 3000!')
 })
  
function closeServer(): void {
    server.close();
}
  
export { servidor, closeServer }