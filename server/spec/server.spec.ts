import 'jasmine';
import request = require("request-promise");

const fs = require('fs');
let path = require('path');

import { Usuario } from '../../common/usuario';
import { Entregador } from '../../common/entregador';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
    var server: any;
  
    beforeAll(() => { server = require('../server') });
  
    afterAll(() => { server.closeServer() });

    it("inicialmente retorna uma lista de usuários vazia", () => {
        return request.get(base_url + "usuario").then(body => expect(body).toBe("[]")).catch(e => expect(e).toEqual(null));
    })

    it("não remove usuário sem estar logado", () => {
        return request.get(base_url + "usuario")
                .then(body =>{
                    let res = body;
                    return request.post(base_url + "deleta")
                        .then(body => {
                            body = JSON.parse(body);
                            expect(body).toEqual({"failure":"Nenhum usuario foi deletado do sistema!"});
                            return request.get(base_url + "usuario").then(body => {
                                expect(body).toEqual(res);
                            }).catch(e =>
                                expect(e).toEqual(null)
                            );
                        }).catch(e =>
                            expect(e).toEqual(null)
                        );
                }).catch(e =>
                  expect(e).toEqual(null)
                );
      })

    it("cadastro bem sucedido de entregador", () => {
        let entregador_test = new Entregador('111.222.333-44', 'João', 'joao@ufpe.br', '1234');
        request.post({'url': base_url + 'usuarios/cadastrar', 'form': entregador_test});
        return request.get(base_url + "usuario").then(body => {
            body = JSON.parse(body);
            let existe = false;
            for (let a of body){
                let entregador_auxiliar = new Entregador('', '', '', '');
                Object.assign(entregador_auxiliar, a);
                if(entregador_auxiliar.Cpf == entregador_test.Cpf && entregador_auxiliar.hasOwnProperty('mascara')){
                    existe = true;
                    break;
                }
            }
            expect(existe).toEqual(true);    
        }).catch(e =>
            expect(e).toEqual(null)
        );
    })

    it("cadastro mal sucedido com EMAIL já cadastrado", () => {
        let usuario_test = new Entregador('936.327.123-21', 'Rafaela', 'rafael@ufpe.br', '2222');
        request.post({'url': base_url + 'usuarios/cadastrar', 'form': usuario_test});
        return request.get(base_url + "usuario").then(body => {
            let res = body;
            let novo_usuario_test = new Entregador('555.777.888-99', 'Rafael', 'rafael@ufpe.br', '1212');
            return request.post({'url': base_url + 'usuarios/cadastrar', 'form': novo_usuario_test}).then(body => {
                body = JSON.parse(body);
                expect(body).toEqual({"failure":"Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!"});
                return request.get(base_url + "usuario").then(body => {
                    //console.log('RES:', res);
                    //console.log('BODY:', body);
                    expect(body).toEqual(res);
                }).catch(e =>
                    expect(e).toEqual(null)
                );
            }).catch(e =>
                expect(e).toEqual(null)
            );
        }).catch(e =>
            expect(e).toEqual(null)
        );
    })

    it("cadastro mal sucedido por falta de CPF", () => {
        let usuario_test = new Entregador('', 'Maria', 'maria@ufpe.br', '4545');
        return request.get(base_url + "usuario").then(body => {
            let res = body;
            return request.post({'url': base_url + 'usuarios/cadastrar', 'form': usuario_test}).then(body => {
                body = JSON.parse(body);
                expect(body).toEqual({"failure":"Alguma das entradas esta nula!"});
                return request.get(base_url + "usuario").then(body => {
                    expect(body).toEqual(res);
                }).catch(e =>
                    expect(e).toEqual(null)
                );
            }).catch(e =>
                expect(e).toEqual(null)
            );
        }).catch(e =>
            expect(e).toEqual(null)
        );
    })
})