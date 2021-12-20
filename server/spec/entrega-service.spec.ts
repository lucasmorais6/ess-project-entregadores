import 'jasmine';
import { Entrega } from '../../common/entrega';
import { EntregaService } from '../src/entregas-service';

describe("O servico de entregas", () => {
  var service: EntregaService;

  beforeEach(() => service = new EntregaService())

  it("é inicialmente vazio", () => {
    expect(service.entregas.length).toBe(0);
  })

  it("cadastra entregas corretamente", () => {
    const sample = <Entrega> {
      "restaurante": "Mc Donalds",
      "endereco": "Rua Padre Roma 199",
      "lucro": 10,
      "tempo_preparo": 45
    }
    service.add(sample);

    expect(service.entregas.length).toBe(1);
    const result = service.entregas[0];
    expect(result.id).toBe(0);
    expect(result.restaurante).toBe(sample.restaurante);
    expect(result.endereco).toBe(sample.endereco);
    expect(result.lucro).toBe(sample.lucro);
    expect(result.tempo_preparo).toBe(sample.tempo_preparo);
    expect(result.entregador_id).toBe(undefined);
    expect(result.is_ativa).toBe(undefined);
  })

  var samples = [ <Entrega>{
    "id": 0,
    "restaurante": "BK",
    "endereco": "Rua Padre Roma 199",
    "lucro": 10,
    "tempo_preparo": 45,
    "entregador_id": 0
  }, <Entrega>{
    "id": 1,
    "restaurante": "Mc Donalds",
    "endereco": "Rua do Futuro, 142",
    "lucro": 20,
    "tempo_preparo": 15
  }, <Entrega>{
    "id": 2,
    "restaurante": "Zio",
    "endereco": "Rua Professor Girafales, 13",
    "lucro": 30,
    "tempo_preparo": 75,
    "entregador_id": 0
  }];

  it("atualiza entregas corretamente", () => {

    service.add(samples[0]);
    service.add(samples[1]);
    service.add(samples[2]);

    const sample = <Entrega>{
      "id": 0,
      "restaurante": "Miou",
      "endereco": "Rua Padre Roma 199",
      "lucro": 20,
      "tempo_preparo": 30
    };
    let result = service.update(sample);
    expect(service.entregas.length).toBe(3);
    expect(result.id).toBe(0);
    expect(result.restaurante).toBe(sample.restaurante);
    expect(result.endereco).toBe(sample.endereco);
    expect(result.lucro).toBe(sample.lucro);
    expect(result.tempo_preparo).toBe(sample.tempo_preparo);
    expect(result.entregador_id).toBe(sample.entregador_id);
    expect(result.is_ativa).toBe(sample.is_ativa);
  })

  it("faz a busca por id corretamente", () => {

    service.add(samples[0]);
    service.add(samples[1]);
    service.add(samples[2]);

    let result = service.getById(0);

    expect(result.id).toBe(samples[0].id);
    expect(result.restaurante).toBe(samples[0].restaurante);
    expect(result.endereco).toBe(samples[0].endereco);
    expect(result.lucro).toBe(samples[0].lucro);
    expect(result.tempo_preparo).toBe(samples[0].tempo_preparo);
    expect(result.entregador_id).toBe(samples[0].entregador_id);
    expect(result.is_ativa).toBe(samples[0].is_ativa);

  })

  it("faz a busca por entregador_id corretamente", () => {

    service.add(samples[0]);
    service.add(samples[1]);
    service.add(samples[2]);

    let result = service.getByEntregadorId(0);

    expect(result.length).toBe(2);
    expect(result[0].id).toBe(samples[0].id);
    expect(result[1].id).toBe(samples[2].id);
  })

  it("faz a busca por disponíveis corretamente", () => {

    service.add(samples[0]);
    service.add(samples[1]);
    service.add(samples[2]);

    let result = service.getByEntregadorIdNull();

    expect(result.length).toBe(1);
    expect(result[0].id).toBe(samples[1].id);
  })
})