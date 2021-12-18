import { Entrega } from "../../common/entrega";

export class EntregaService {
  entregas: Entrega[] = [];
  idCount: number = 0;
  
  add(entrega: Entrega): Entrega {
    //if (this.entregas.length >= 10) return null;
    var newEntrega = <Entrega>{id: this.idCount, ...entrega}
    if (newEntrega.lucro <= 0) {
      throw Error("Lucro can't equal or less than zero")
    }
    this.entregas.push(newEntrega);
    this.idCount++;
    return newEntrega;
  }

  update(entrega: Entrega) : Entrega {
    console.log(this.entregas)
    var result : Entrega = this.entregas.find(e => e.id == entrega.id);
    if (result) result.update(entrega);
    return result;
  }

  get() : Entrega[] {
    return this.entregas;
  }
  
  getById(entregaId: number) : Entrega {
    return this.entregas.find(({ id }) => id == entregaId);
  }

  getByEntregadorId(id: number) : Entrega[] {
    return this.entregas.filter(({ entregador_id }) => entregador_id == id)
  }

  getByEntregadorIdNull() : Entrega[] {
    return this.entregas.filter(({ entregador_id }) => entregador_id == null)
  }

}
