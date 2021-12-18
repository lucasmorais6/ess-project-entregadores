import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Entrega } from './entrega';
import { MinhasEntregasService } from './minhas_entregas.service';

@Component({
  selector: 'app-root',
  templateUrl: './minhas_entregas.component.html',
  styleUrls: ['./minhas_entregas.component.css']
})
export class MinhasEntregasComponent implements OnInit {
   constructor(private entregaService: MinhasEntregasService) {}

   userId: number = 1;
   entrega: Entrega = new Entrega();
   entregas: Entrega[] = [];

   is_ativas_empty(): boolean {
      return this.entregas.filter(({is_ativa}) => is_ativa).length == 0;
   }
   is_finalizadas_empty(): boolean {
      return this.entregas.filter(({is_ativa}) => !is_ativa).length == 0;
   }

   finalizarEntrega(e: Entrega): void {
      e.is_ativa = false
      //this.entregas = this.entregas.filter(({ id }) => e.id != id );
      this.entregaService.update(e)
      .then(result => {
            if (result) {
               
            }
         })
         .catch(erro => alert(erro));
   }

   ngOnInit(): void {
      this.entregaService.getEntregas(this.userId)
         .then(entregas => this.entregas = entregas)
         .catch(erro => alert(erro));
   }

}