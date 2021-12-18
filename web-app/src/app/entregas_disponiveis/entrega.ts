export class Entrega {
    id: number;
    restaurante: string;
    tempo_preparo: number;
    endereco: string;
    lucro: number;
    entregador_id: number = null;
    is_ativa: boolean = false;
    constructor() {}
    
}