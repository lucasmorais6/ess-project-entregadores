import 'jasmine';
import { Entrega } from '../../common/entrega';
import { EntregaService } from '../src/entregas-service';

describe("O servico de carros", () => {
  var service: EntregaService;

  beforeEach(() => service = new EntregaService())

  it("é inicialmente vazio", () => {
    expect(service.entregas.length).toBe(0);
  })

  it("cadastra entregas corretamente", () => {
    const sample = <Entrega> {
      "id": 1,
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
    expect(result.entregador_id).toBe(null);
    expect(result.is_ativa).toBe(false);
  })
})