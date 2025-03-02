import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../common/usuario';
import { CadastroService } from './cadastro.service';

@Component({
    selector: 'cadastro-usuarios',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
  })

export class CadastroComponent {
    usuarios: Usuario[] = [];
    notificacaoClasses: {} = {};
    notificacaoTexto: String = '';

    constructor(private cadastroService: CadastroService) { }

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

    cadastrarUsuario(cpf: string, nome: string, email: string, senha:string): void{
    
        let eh_entregador = true;
        this.cadastroService.cadastrar(cpf, nome, email, senha, eh_entregador).subscribe(
            (status) => {
                if (status === "Usuario cadastrado com sucesso!") {
                    this.cadastroService.getUsuarios().subscribe(
                        all_users => { 
                        this.usuarios = all_users; 
                        },
                    );
                    this.controla_notificacao(true, true, status);
                } else if(status === 'Um usuario com esse CPF ou esse EMAIL ja existe na base de dados!') {
                    this.controla_notificacao(true, false, status);
                } else if(status === 'Alguma das entradas esta nula!'){
                    this.controla_notificacao(true, false, status);
                } else {
                    this.controla_notificacao(true, false, status);
                }
            },
        );
    }
}