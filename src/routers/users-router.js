const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../controllers/users-controller');
const { requireAuth } = require('../middleware/auth-middleware');

const usersRouter = Router();

usersRouter.get('/', requireAuth, fetchAll);

usersRouter.get('/:id', requireAuth, fetch);

usersRouter.post('/', create);

usersRouter.put('/:id', replace);

usersRouter.patch('/:id', update);

usersRouter.delete('/:id', remove);

module.exports = usersRouter;
