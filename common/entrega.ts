export class Entrega {
    id: number;
    restaurante: string;
    tempo_preparo: number;
    endereco: string;
    lucro: number;
    entregador_id: number = null;
    is_ativa: boolean = false;
    constructor() {}
    
    update(entrega: Entrega){
        this.restaurante = entrega.restaurante;
        this.endereco = entrega.endereco;
        this.tempo_preparo = entrega.tempo_preparo;
        this.lucro = entrega.lucro;
        this.entregador_id = entrega.entregador_id;
        this.is_ativa = entrega.is_ativa;
      }
}