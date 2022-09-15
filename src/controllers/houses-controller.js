const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const HouseModel = require('../models/house-model');

const createHouseNotFoundError = (houseId) => createNotFoundError(`House with id '${houseId}' was not found`);

const fetchAll = async (req, res) => {
  const { joinBy } = req.query;

  try {
    const houseDocuments = joinBy === 'categoryId'
      ? await HouseModel.find().populate('categoryId')
      : await HouseModel.find();

    res.status(200).json(houseDocuments);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const houseId = req.params.id;
  const { joinBy } = req.query;

  try {
    const foundHouse = joinBy === 'categoryId'
      ? await HouseModel.findById(houseId).populate('categoryId')
      : await HouseModel.findById(houseId);
    if (foundHouse === null) throw createHouseNotFoundError(houseId);

    res.status(200).json(foundHouse);
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newHouseData = req.body;

  try {
    await HouseModel.validateData(newHouseData);

    const newHouse = await HouseModel.create(newHouseData)

    res.status(201).json(newHouse)

  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const houseId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newHouseData = { title, description, categoryId, img, price };

  try {
    await HouseModel.validateData(newHouseData);

    const updatedHouse = await HouseModel.findByIdAndUpdate(
      houseId,
      newHouseData,
      { new: true, runValidators: true }
    );

    if (updatedHouse === null) throw createHouseNotFoundError(houseId);

    res.status(200).json(updatedHouse)

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const houseId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newHouseData = removeEmptyProps({ title, description, categoryId, img, price });

  try {
    await HouseModel.validateUpdateData(newHouseData);

    const updatedHouse = await HouseModel.findByIdAndUpdate(
      houseId,
      newHouseData,
      { new: true }
    );

    if (updatedHouse === null) throw createHouseNotFoundError(houseId);

    res.status(200).json(updatedHouse)

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const houseId = req.params.id;

  try {
    const deleteHouse = await HouseModel.findByIdAndDelete(houseId);
    if (deleteHouse === null) createHouseNotFoundError(houseId);

    res.status(200).json(deleteHouse);
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
