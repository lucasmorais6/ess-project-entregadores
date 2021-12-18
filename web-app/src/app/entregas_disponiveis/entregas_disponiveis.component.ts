import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Entrega } from '../../../../common/entrega';
import { EntregaService } from './entregas_disponiveis.service';

@Component({
  selector: 'app-root',
  templateUrl: './entregas_disponiveis.component.html',
  styleUrls: ['./entregas_disponiveis.component.css']
})
export class EntregasComponent implements OnInit {
   constructor(private entregaService: EntregaService) {}
   
   private user_id: number = 1;
   entrega: Entrega = new Entrega();
   entregas: Entrega[] = [];

   createEntrega(e: Entrega): void {
      this.entregaService.create(e)
      .then(result => {
            if (result) {
               this.entregas.push(<Entrega> result);
               this.entrega = new Entrega();
            }
         })
         .catch(erro => alert(erro));
   }

   aceitarEntrega(e: Entrega): void {
      e.entregador_id = this.user_id;
      e.is_ativa = true;
      this.entregas = this.entregas.filter(({ id }) => e.id != id );
      this.entregaService.update(e)
      .then(result => {
            if (result) {
               
            }
         })
         .catch(erro => alert(erro));
   }

   ngOnInit(): void {
      this.entregaService.getEntregas()
         .then(entregas => this.entregas = entregas)
         .catch(erro => alert(erro));
   }

}