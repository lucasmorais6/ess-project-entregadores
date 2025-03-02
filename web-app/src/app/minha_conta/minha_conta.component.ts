import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../common/usuario';
import { Entregador } from '../../../../common/entregador';

import { MinhaContaService } from './minha_conta.service';


@Component({
    selector: 'minha_conta',
    templateUrl: './minha_conta.component.html',
    styleUrls: ['./minha_conta.component.css']
  })

  export class MinhaContaComponent {
    notificacaoClasses: {} = {};
    notificacaoTexto: String = '';
    notificacao_login: String = '';
    meu_usuario = new Usuario('', '', '', '');

    constructor(private minhaContaService: MinhaContaService) { 
        this.minhaContaService.meu_usuario().subscribe(
            (meu_user) => { 
                if(meu_user != null){
                    if(meu_user.hasOwnProperty('mascara')){
                        this.meu_usuario = new Entregador(meu_user["cpf"], meu_user["nome"], meu_user["email"], meu_user["senha"]);
                        this.controla_notificacao(true, true, "");
                    }
                }else{
                    this.controla_notificacao(true, true, "Voce nao esta logado no sistema!");
                }
            },
        );
    }

    controla_notificacao(ativa: boolean, positiva: boolean = false, texto: String = ''){
        if (!ativa) {
            this.notificacaoClasses =  {
                esconder: true,
            };
        }else {
            this.notificacaoClasses =  {
                negativa: !positiva,
                positiva: positiva,
                esconder: false,
            };
            this.notificacaoTexto = texto;
        }
    }

    atualiza(cpf: string, nome: string, email: string, senha: string){
        this.minhaContaService.atualiza(cpf, nome, email, senha).subscribe(
            (status) => {
                if (status === "Atualizacao realizada com sucesso!") {
                    this.controla_notificacao(true, true, status);
                } else if(status === 'Um outro usuario com esse CPF ou esse EMAIL ja existe na base de dados!') {
                    console.log(status);
                    this.controla_notificacao(true, false, status);
                } else if(status === 'Alguma das entradas esta nula!'){
                    console.log(status)
                    this.controla_notificacao(true, false, status);
                } else if(status === 'Voce nao esta logado no sistema para atualizar seus dados!'){
                    this.controla_notificacao(true, false, status);
                } else {
                    console.log("Erro ao realizar a atualizacao!");
                    this.controla_notificacao(true, false, status);
                }
            },
        );
        this.minhaContaService.meu_usuario().subscribe(
            (meu_user) => { 
                if(meu_user != null){
                    if(meu_user.hasOwnProperty('mascara')){
                        this.meu_usuario = new Entregador(meu_user["cpf"], meu_user["nome"], meu_user["email"], meu_user["senha"]);
                    }
                    console.log(this.meu_usuario);
                }
            },
        );
    }
    
    desloga(){
        if(this.meu_usuario.Cpf == ''){
            this.controla_notificacao(true, false, "Voce nao esta logado no sistema!");
        }
        else{
            this.minhaContaService.desloga().subscribe(
                (status) => {
                    if (status === "Usuario deslogado do sistema com sucesso!") {
                        this.controla_notificacao(true, true, status);
                        this.meu_usuario = new Usuario('', '', '', '');
                    }else{
                        this.controla_notificacao(true, false, "Erro ao realizar o log out!");
                    }
                    console.log(this.meu_usuario);
                }
            );
        }
    }

    deleta(){
        if(this.meu_usuario.Cpf == ''){
            this.controla_notificacao(true, false, "Voce nao esta logado no sistema!");
        }
        else{
            this.minhaContaService.deleta().subscribe(
                (status) => {
                    if (status === "Usuario deletado do sistema com sucesso!") {
                        this.controla_notificacao(true, true, status);
                        this.meu_usuario = new Usuario('', '', '', '');
                    }else{
                        this.controla_notificacao(true, false, "Erro ao realizar o delete!");
                    }
                    console.log(this.meu_usuario);
                }
            );
        }
    }
}