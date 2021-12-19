"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.EntregaService = void 0;
var EntregaService = /** @class */ (function () {
    function EntregaService() {
        this.entregas = [];
        this.idCount = 0;
    }
    EntregaService.prototype.add = function (entrega) {
        console.log("sasasasa");
        var newEntrega = __assign({ id: this.idCount }, entrega);
        if (newEntrega.lucro <= 0) {
            throw Error("Lucro tem que ser um valor positivo maior que zero");
        }
        if (newEntrega.tempo_preparo < 0) {
            throw Error("Tempo de preparo não pode ser menor que zero");
        }
        this.entregas.push(newEntrega);
        this.idCount++;
        return newEntrega;
    };
    EntregaService.prototype.update = function (entrega) {
        var result = this.entregas.find(function (e) { return e.id == entrega.id; });
        if (result)
            result.update(entrega);
        return result;
    };
    EntregaService.prototype.get = function () {
        return this.entregas;
    };
    EntregaService.prototype.getById = function (entregaId) {
        return this.entregas.find(function (_a) {
            var id = _a.id;
            return id == entregaId;
        });
    };
    EntregaService.prototype.getByEntregadorId = function (id) {
        return this.entregas.filter(function (_a) {
            var entregador_id = _a.entregador_id;
            return entregador_id == id;
        });
    };
    EntregaService.prototype.getByEntregadorIdNull = function () {
        return this.entregas.filter(function (_a) {
            var entregador_id = _a.entregador_id;
            return entregador_id == null;
        });
    };
    return EntregaService;
}());
exports.EntregaService = EntregaService;
