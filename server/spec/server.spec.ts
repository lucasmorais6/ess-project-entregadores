import 'jasmine';
import request = require("request-promise");
import { closeServer } from '../server';

const baseUrl = "http://localhost:3000";
const entregasUrl = `${baseUrl}/entregas`
const entregasDisponiveisUrl = `${baseUrl}/entregas/disponiveis`
describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de entregas", () => {
    return request.get(entregasUrl).then(body => expect(body).toBe("[]")).catch(e => expect(e).toEqual(null));
  })

  it("só cadastra com lucro positivo", () => {
    const body = {
      "restaurante": "Mc Donalds",
      "endereco": "Rua Padre Roma 199",
      "lucro": -10,
      "tempo_preparo": 45
    }
    const options:any = {method: 'POST', uri: (entregasUrl), body, json: true};
    return request(options).catch(({ statusCode }) => {
      expect(statusCode).toBe(400);
    })
  });

  it("só cadastra com tempo_preparo positivo", () => {
    const body = {
      "restaurante": "Mc Donalds",
      "endereco": "Rua Padre Roma 199",
      "lucro": 10,
      "tempo_preparo": -45
    }
    const options:any = {method: 'POST', uri: (entregasUrl), body, json: true};
    return request(options).catch(({ statusCode }) => {
      expect(statusCode).toBe(400);
    })
  });

  it("cadastra entrega com sucesso", () => {
    const body = {
      "restaurante": "Mc Donalds",
      "endereco": "Rua Padre Roma 199",
      "lucro": 10,
      "tempo_preparo": 45
    }
    const options :any = {method: 'POST', uri: (entregasUrl), body, json: true};
    const newCar = { id: 0, ...body };
    return request(options).then(body => {
         expect(body).toEqual(newCar);
     });
  });

})