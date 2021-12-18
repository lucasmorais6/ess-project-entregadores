import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Entrega } from '../../../../common/entrega';

@Injectable()
export class RegistrarEntregaService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  create(entrega: Entrega): Promise<Entrega> {
    return this.http.post(this.taURL + "/entregas",JSON.stringify(entrega), {headers: this.headers})
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