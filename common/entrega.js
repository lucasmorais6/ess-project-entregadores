"use strict";
exports.__esModule = true;
exports.Entrega = void 0;
var Entrega = /** @class */ (function () {
    function Entrega() {
        this.entregador_id = null;
        this.is_ativa = false;
    }
    Entrega.prototype.update = function (entrega) {
        this.restaurante = entrega.restaurante;
        this.endereco = entrega.endereco;
        this.tempo_preparo = entrega.tempo_preparo;
        this.lucro = entrega.lucro;
        this.entregador_id = entrega.entregador_id;
        this.is_ativa = entrega.is_ativa;
    };
    return Entrega;
}());
exports.Entrega = Entrega;
