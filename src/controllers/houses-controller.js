/* eslint-disable no-throw-literal */
const {
  createId,
  isValidJokeData,
  createCmpById,
  removeEmptyProps,
} = require('../helpers');

const database = {
  houses: [
    {
      id: '815C5D64-820D-2DCD-10AA-59EE2D0BC780',
      title: 'Rasa',
      description: 'Nullam vitae diam. Proin dolor. Nulla semper tellus id nunc interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio. Etiam',
      cityId: 1,
      img: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
      price: 800000,
    },
    {
      id: 'E9522542-AB55-9279-A13C-03645AE88D28',
      title: 'Liepa',
      description: 'egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae, posuere at, velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia',
      cityId: 3,
      img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      price: 700000,
    },
    {
      id: '25D5DF9E-91AA-0358-D7DA-A70C6C448F2A',
      title: 'Šilas',
      description: 'erat vel pede blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit sed consequat auctor, nunc nulla vulputate dui, nec tempus mauris erat eget ipsum. Suspendisse sagittis. Nullam vitae diam.',
      cityId: 3,
      img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80',
      price: 850000,
    },
    {
      id: 'F1BB0713-A37A-9766-7896-26BDADC62132',
      title: 'Ramuma',
      description: 'dis parturient montes, nascetur ridiculus mus. Proin vel arcu eu odio tristique pharetra. Quisque ac libero nec ligula consectetuer rhoncus. Nullam velit dui, semper et, lacinia vitae, sodales at,',
      cityId: 2,
      img: 'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      price: 900000,
    },
    {
      id: 'FDEA9082-2D95-F3B3-A5B2-F851EC375AAC',
      title: 'Oazė',
      description: 'dui, semper et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem ac risus. Morbi metus. Vivamus euismod urna. Nullam lobortis quam a',
      cityId: 2,
      img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      price: 630000,
    },
    {
      id: '6B09AC86-EBD2-41B1-1733-2AEEFE491165',
      title: 'Sala',
      description: 'nec ligula consectetuer rhoncus. Nullam velit dui, semper et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem',
      cityId: 1,
      conditionId: 12,
      img: 'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      price: 200000,
    },
    {
      id: 'A565A92E-71B7-BEC0-EB49-A8E5B52DB31B2',
      title: 'Svaja',
      description: 'egestas, urna justo faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna.',
      cityId: 1,
      img: 'https://images.unsplash.com/photo-1625602812206-5ec545ca1231?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      price: 500000,
    },
    {
      id: '6B09AC86-EBD2-41B1-1733-2AEEFE4165',
      title: 'Kopa',
      description: 'nec ligula consectetuer rhoncus. Nullam velit dui, semper et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem',
      cityId: 3,
      conditionId: 12,
      img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
      price: 250000,
    },
    {
      id: 'A565A92E-71B7-BEC0-EB49-A8E5B52DB312',
      title: 'Sapnas',
      description: 'egestas, urna justo faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna.',
      cityId: 1,
      img: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      price: 550000,
    },
  ],
  cities: [
    {
      id: 1,
      title: 'Vilnius',
    },
    {
      id: 2,
      title: 'Kaunas',
    },
    {
      id: 3,
      title: 'Klaipėda',
    },
  ],

};

const fetchAll = (req, res) => {
  res.status(200).json(database.houses);
};

const fetch = (req, res) => {
  const houseId = req.params.id;

  try {
    const foundHouse = database.houses.find(createCmpById(houseId));
    if (foundHouse === undefined) {
      throw ({
        message: 'Serveris nepagavo bajerio',
        status: 404,
      });
    }

    res.status(200).json(foundHouse);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const create = (req, res) => {
  const newHouseData = req.body;

  try {
    if (!isValidJokeData(newHouseData)) {
      throw ({
        message: 'Prastas humoro jausmas',
        status: 400,
      });
    }

    const newHouse = {
      id: createId(),
      ...newHouseData,
    };

    database.houses.push(newHouse);

    res.status(201).json(newHouse);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const replace = (req, res) => {
  const houseId = req.params.id;
  const { question, punchline } = req.body;
  const newHouseData = { question, punchline };

  try {
    if (!isValidJokeData(newHouseData)) {
      throw ({
        message: 'Prastas humoro jausmas',
        status: 400,
      });
    }

    const foundHouseIndex = database.houses.findIndex(createCmpById(houseId));
    if (foundHouseIndex === -1) {
      throw ({
        message: 'Serveris nepagavo bajerio',
        status: 404,
      });
    }
    const updatedHouse = {
      id: database.houses[foundHouseIndex].id,
      ...newHouseData,
    };

    database.houses[foundHouseIndex] = updatedHouse;

    res.status(200).json(updatedHouse);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const update = (req, res) => {
  const houseId = req.params.id;
  const { question, punchline } = req.body;
  const newHouseData = removeEmptyProps({ question, punchline });

  try {
    const foundHouseIndex = database.houses.findIndex(createCmpById(houseId));
    if (foundHouseIndex === -1) {
      throw ({
        message: 'Serveris nepagavo bajerio',
        status: 404,
      });
    }

    const updatedHouse = {
      ...database.houses[foundHouseIndex],
      ...newHouseData,
    };

    database.houses[foundHouseIndex] = updatedHouse;

    res.status(200).json(updatedHouse);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const remove = (req, res) => {
  const houseId = req.params.id;

  try {
    const foundHouseIndex = database.houses.findIndex(createCmpById(houseId));
    if (foundHouseIndex === -1) {
      throw ({
        message: 'Serveris nepagavo bajerio',
        status: 404,
      });
    }

    const [deletedDadJoke] = database.houses.splice(foundHouseIndex, 1);

    res.status(200).json(deletedDadJoke);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
