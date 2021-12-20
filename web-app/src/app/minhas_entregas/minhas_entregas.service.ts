import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Entrega } from '../../../../common/entrega';

@Injectable()
export class MinhasEntregasService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getEntregas(userId: number): Promise<Entrega[]> {
    let entregas = this.http.get(this.taURL + "/entregas/entregador/" + userId)
    .toPromise()
    .then(res => {
      return res
    })
    .catch(this.catch);
    return entregas;
  }

  update(entrega: Entrega): Promise<Entrega> {
    return this.http.put(this.taURL + "/entregas",JSON.stringify(entrega), {headers: this.headers})
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