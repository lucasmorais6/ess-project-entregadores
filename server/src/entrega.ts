export class Entrega {
    id: number;
    restaurante: string;
    tempo_preparo: number;
    endereco: string;
    lucro: number;
  
    constructor(entrega: Entrega) {
      this.id = entrega.id;
      this.restaurante = entrega.restaurante;
      this.tempo_preparo = entrega.tempo_preparo;
      this.endereco = entrega.endereco;
      this.lucro = entrega.lucro;
    }
  
    update(entrega: Entrega): void {
      this.restaurante = entrega.restaurante;
      this.endereco = entrega.endereco;
      this.tempo_preparo = entrega.tempo_preparo;
      this.lucro = entrega.lucro;
    }
}