import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Entrega } from '../../../../common/entrega';
import { RegistrarEntregaService } from './registrar_entrega.service';

@Component({
  selector: 'app-root',
  templateUrl: './registrar_entrega.component.html',
  styleUrls: ['./registrar_entrega.component.css']
})
export class RegistrarEntregaComponent implements OnInit {
   constructor(private entregaService: RegistrarEntregaService) {}

   entrega: Entrega = new Entrega();

   createEntrega(e: Entrega): void {
      this.entregaService.create(e)
      .then(result => {
            if (result) {
               this.entrega = new Entrega()
            }
         })
         .catch(erro => alert(erro));
   }

   ngOnInit(): void {

   }

}