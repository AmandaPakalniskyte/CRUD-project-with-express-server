const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../controllers/houses-controller');

const housesRouter = Router();

/*
  type DadJoke = {
    id: number,
    question: string,
    punchline: string,
  }

  type DadJokeData = {
    question: string,
    punchline: string,
  }

  type PartialDadJoke = {
    question?: string,
    punchline?: string,
  }

                               Esybe grįstas API serveris - REST API

  HTTP TYPE  | URL             | RequestData  | Response data  | Paaiškinimas
  ------------------------------------------------------------ |-----------------------------
  GET        | /dad-jokes      |     ---      | DadJoke[]      | Grąžina visų bajerių masyvą
  GET        | /dad-jokes/:id  |     ---      | DadJoke        | Grąžja bajerį pagal "id"
  POST       | /dad-jokes      | DadJokeData  | DadJoke        | Sukuria naują bajerį
  PUT        | /dad-jokes/:id  | DadJokeData  | DadJoke        | SUKEIČIA duomenis pagal "id"
  PATCH      | /dad-jokes/:id  | DadJokeData  | PartialDadJoke | Atnaujina duomenis pagal "id"
*/

housesRouter.get('/', fetchAll);

housesRouter.get('/:id', fetch);

housesRouter.post('/', create);

housesRouter.put('/:id', replace);

housesRouter.patch('/:id', update);

housesRouter.delete('/:id', remove);

module.exports = housesRouter;
