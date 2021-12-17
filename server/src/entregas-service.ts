import { Entrega } from "./entrega";

export class EntregaService {
  entregas: Entrega[] = [];
  idCount: number = 0;
  
  add(entrega: Entrega): Entrega {
    if (this.entregas.length >= 10) return null;
    const newEntrega = new Entrega(<Entrega> { id: this.idCount, ...entrega });
    if (newEntrega.lucro <= 0) {
      throw Error("Price can't equal or less than zero")
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
}
