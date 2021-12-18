import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Entrega } from './entrega';

@Injectable()
export class MinhasEntregasService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  getEntregas(userId: number): Promise<Entrega[]> {
    let entregas = this.http.get(this.taURL + "/entregas/entregador/" + userId)
    .toPromise()
    .then(res => res.json() as Entrega[])
    .catch(this.catch);
    return entregas;
  }

  update(entrega: Entrega): Promise<Entrega> {
    return this.http.put(this.taURL + "/entregas",JSON.stringify(entrega), {headers: this.headers})
      .toPromise()
      .then(res => {
        if (res.status === 201) {return entrega;} else {return null;}
      })
      .catch(this.catch);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}