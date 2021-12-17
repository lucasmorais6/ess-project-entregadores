import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarsComponent } from './cars/cars.component';
import { CarService } from './cars/cars.service';
import { EntregasComponent } from './entregas/entregas.component';
import { EntregaService } from './entregas/entregas.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarsComponent,
    EntregasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'cars',
        component: CarsComponent
      },
      {
        path: 'entregas',
        component: EntregasComponent
      }
    ])
  ],
  providers: [CarService,EntregaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
