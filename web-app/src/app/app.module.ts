import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EntregasComponent } from './entregas_disponiveis/entregas_disponiveis.component';
import { EntregaService } from './entregas_disponiveis/entregas_disponiveis.service';
import { MinhasEntregasComponent } from './minhas_entregas/minhas_entregas.component';
import { MinhasEntregasService } from './minhas_entregas/minhas_entregas.service';
import { RegistrarEntregaComponent } from './registrar_entrega/registrar_entrega.component';
import { RegistrarEntregaService } from './registrar_entrega/registrar_entrega.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EntregasComponent,
    MinhasEntregasComponent,
    RegistrarEntregaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'entregas_disponiveis',
        component: EntregasComponent
      },
      {
        path: 'minhas_entregas',
        component: MinhasEntregasComponent
      },
      {
        path: 'registrar_entrega',
        component: RegistrarEntregaComponent
      }
    ])
  ],
  providers: [EntregaService, MinhasEntregasService, RegistrarEntregaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
