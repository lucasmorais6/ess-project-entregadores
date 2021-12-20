import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

import { CadastroComponent } from './cadastro/cadastro.component';
import { CadastroService } from './cadastro/cadastro.service';

import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CadastroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'cadastro',
        component: CadastroComponent
      },
    ]),
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
    ]),
  ],
  providers: [CadastroService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
