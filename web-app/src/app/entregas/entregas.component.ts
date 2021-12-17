import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Entrega } from './entrega';
import { EntregaService } from './entregas.service';

@Component({
  selector: 'app-root',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css']
})
export class EntregasComponent implements OnInit {
   constructor(private entregaService: EntregaService) {}

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

   ngOnInit(): void {
      this.entregaService.getEntregas()
         .then(entregas => this.entregas = entregas)
         .catch(erro => alert(erro));
   }

}