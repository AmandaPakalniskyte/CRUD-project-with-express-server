// eslint-disable-next-line import/no-extraneous-dependencies
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

housesRouter.get('/', fetchAll);

housesRouter.get('/:id', fetch);

housesRouter.post('/', create);

housesRouter.put('/:id', replace);

housesRouter.patch('/:id', update);

housesRouter.delete('/:id', remove);

module.exports = housesRouter;
