const { removeEmptyProps } = require('../helpers');
const HouseModel = require('../models/house-model');

const isValidHouse = ({ title, description, categoryId, img, price }) =>
  title !== undefined && typeof title === 'string' && title !== '' &&
  description !== undefined && typeof description === 'string' && description !== '' &&
  categoryId !== undefined && typeof categoryId === 'string' && categoryId !== '' &&
  img !== undefined && typeof img === 'string' && img !== '' &&
  price !== undefined && typeof price === 'number' && price > 0;


const createHouseNotFoundError = (houseId) => ({
  message: `House with id '${houseId}' was not found`,
  status: 404
})

const createHouseBadDataError = (dataObj) => ({
  message: `House data is invalid:\n${JSON.stringify(dataObj, null, 4)}`,
  status: 400
});

const fetchAll = async (req, res) => {
  const houseDocuments = await HouseModel.find();

  res.status(200).json(houseDocuments);
};

const fetch = async (req, res) => {
  const houseId = req.params.id;

  try {
    const foundHouse = await HouseModel.findById(houseId);
    if (foundHouse === null) throw createHouseNotFoundError(houseId);

    res.status(200).json(foundHouse);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const create = async (req, res) => {
  const newHouseData = req.body;

  try {
    if (!isValidHouse(newHouseData)) throw createHouseBadDataError(newHouseData);

    const newHouse = await HouseModel.create(newHouseData)

    res.status(201).json(newHouse)

  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const replace = async (req, res) => {
  const houseId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newHouseData = { title, description, categoryId, img, price };

  try {
    if (!isValidHouse(newHouseData)) throw createHouseBadDataError(newHouseData);

    const updateHouse = await HouseModel.findByIdAndUpdate(
      houseId,
      newHouseData,
      { new: true, runValidators: true }
    );

    if (updateHouse === null) throw createHouseNotFoundError(houseId);

    res.status(200).json(updateHouse)

  } catch (error) {
    const { status, message } = error;

    if (status && message) {
      res.status(status).json({ message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

const update = async (req, res) => {
  const houseId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newHouseData = removeEmptyProps({ title, description, categoryId, img, price });

  try {
    const updatedHouse = await HouseModel.findByIdAndUpdate(
      houseId,
      newHouseData,
      { new: true }
    );

    if (updatedHouse === null) throw createHouseNotFoundError(houseId);

    res.status(200).json(updatedHouse)

  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const remove = async (req, res) => {
  const houseId = req.params.id;

  try {
    const deletedHouse = await HouseModel.findByIdAndDelete(houseId);
    if (deletedHouse === null) createHouseNotFoundError(houseId);

    res.status(200).json(deletedHouse);
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
