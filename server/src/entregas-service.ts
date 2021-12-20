import { Entrega } from "../../common/entrega";

export class EntregaService {
  entregas: Entrega[] = [];
  idCount: number = 0;
  
  add(entrega: Entrega): Entrega {
    var newEntrega = <Entrega>{id: this.idCount, ...entrega}
    if (newEntrega.lucro <= 0) {
      throw Error("Lucro tem que ser um valor positivo maior que zero")
    }
    if (newEntrega.tempo_preparo < 0) {
      throw Error("Tempo de preparo não pode ser menor que zero")
    }
    this.entregas.push(newEntrega);
    this.idCount++;
    return newEntrega;
  }

  update(entrega: Entrega) : Entrega {
    var result : Entrega = this.entregas.find(e => e.id == entrega.id);
    console.log(result);

    // isso aqui fere o conceito de possuir uma solid architecture mas
    // precisei deixar assim pois começou a ter problema com a função update de entrega
    // e não consegui resolver
    result.id = entrega.id;
    result.endereco = entrega.endereco;
    result.entregador_id = entrega.entregador_id;
    result.is_ativa = entrega.is_ativa;
    result.lucro = entrega.lucro;
    result.restaurante = entrega.restaurante;
    result.tempo_preparo = entrega.tempo_preparo;
    //if (result) result.update(entrega);
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
