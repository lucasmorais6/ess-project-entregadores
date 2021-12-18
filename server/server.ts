import express = require('express');
import bodyParser = require("body-parser");

import { CarService } from './src/cars-service';
import { Car } from './src/car';
import { EntregaService } from './src/entregas-service';
import { Entrega } from '../common/entrega';
var app = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

var carService: CarService = new CarService();

var entregaService: EntregaService = new EntregaService();


app.get('/entregas', function(req, res){
  const entregas = entregaService.get();
  res.send(JSON.stringify(entregas));
});

app.get('/entregas/disponiveis', function(req, res){
  const entregas = entregaService.getByEntregadorIdNull();
  res.send(JSON.stringify(entregas));
});

app.get('/entregas/:id', function(req, res){
  const id = req.params.id;
  const entrega = entregaService.getById(id);
  if (entrega) {
    res.send(entrega);
  } else {
    res.status(404).send({ message: `Entrega ${id} could not be found`});
  }
});

app.get('/entregas/entregador/:id', function(req, res){
  const id = req.params.id;
  const entregas = entregaService.getByEntregadorId(id);
  if (entregas) {
    res.send(entregas);
  } else {
    res.status(404).send({ message: `Entregas from entregador ${id} could not be found`});
  }
});

app.post('/entregas', function(req: express.Request, res: express.Response){
  const entrega: Entrega = <Entrega> req.body;
  try {
    const result = entregaService.add(entrega);
    if (result) {
      res.status(201).send(result);
    } else {
      res.status(403).send({ message: "Entrega list is full"});
    }
  } catch (err) {
    const {message} = err;
    res.status(400).send({ message })
  }
});

app.put('/entregas', function (req: express.Request, res: express.Response) {
  const entrega: Entrega = <Entrega> req.body;
  const result = entregaService.update(entrega);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send({ message: `Entrega ${entrega.id} could not be found.`});
  }
})

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { app, server, closeServer }