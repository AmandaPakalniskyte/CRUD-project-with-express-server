const express = require('express');
const housesRouter = require('./routers/houses-router');

const server = express();

//  Middleware
server.use(express.json());
server.use('/houses', housesRouter);

server.listen(2566, (err) => {
  if (err) {
    console.error('Serverio paleidimo klaida');
  }

  console.log('serveris veikia ant http://localhost:8005');
});
