import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Entrega } from '../../../../common/entrega';

@Injectable()
export class RegistrarEntregaService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  create(entrega: Entrega): Promise<Entrega> {
    return this.http.post(this.taURL + "/entregas",JSON.stringify(entrega), {headers: this.headers})
      .toPromise()
      .then(res => {
        return res
      })
      .catch(this.catch);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}